package com.assoc.jad.familytree.service;

import java.util.HashMap;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assoc.jad.familytree.bean.FamilyTreeBean;
import com.assoc.jad.familytree.dao.FamilyTreeDao;
import com.assoc.jad.familytree.jsonmapper.MapJsonToObject;
import com.assoc.jad.familytree.jsonmapper.MapObjectToJson;
import com.assoc.jad.familytree.model.FamilyTree;
import com.assoc.jad.familytree.tools.FamilyStatic;

@Service
public class FamilyTreeService extends AFamilyTreeService {
	final String loginRequirement = "{\n"
			+"json = {};\n"
			+ "	const regex = /^[a-zA-Z].*\\@.*\\..*$/;\n"
			+ "	json['result'] = true;\n"
			+ "	if (!arg1.match(regex)) {\n"
			+ "		json['result'] = false;\n"
			+ "		json['hint'] = 'loginid should be an email';\n"
			+ "	}\n"
			+ "	return json;\n};"
			+ "";
	@Autowired
	FamilyTreeDao familyTreeDao;

	@SuppressWarnings("unchecked")
	public JSONObject loginReq(HttpServletRequest req) {
		JSONObject json = new JSONObject();
		String wrk1 = req.getRequestURL().toString();
		String wrk2 = req.getRequestURI().toString();
		wrk1 = wrk1.replace(wrk2,"");

		String contextPath = "familyTree";
		if (req.getContextPath().length() > 0) contextPath = req.getContextPath().substring(1);
		String callbackNext = wrk1+"/"+contextPath+"/addFamilyTree.jsp";
		String callbackPrev = wrk1+"/"+contextPath+"/register.jsp";
		String restURL = "https://localhost:28089/login";
		json.put("html",restURL);
		json.put("infomsg","");
		json.put("callbackNext",callbackNext);
		json.put("callbackPrev",callbackPrev);
		json.put("serviceOrig",contextPath);
		json.put("serviceDest","login");
		json.put("loginid","");				//TODO
		json.put("contextPath",contextPath);
		json.put("access",FamilyStatic.SYSADMIN);
		
		
		JSONObject jsonContract = BldContract();
		json.put("contract", jsonContract);
		return json;
	}
	@SuppressWarnings("unchecked")
	public JSONObject registerReq(HttpServletRequest req) {
		JSONObject json =loginReq(req);
		String restURL = "https://localhost:28089/register.jsp";
		json.put("html",restURL);
		return json;
	}
	@SuppressWarnings("unchecked")
	public JSONObject bldBeans(String jsonitem, HashMap<String, Object> beanInstances) {
			
		JSONObject jsonOut = new JSONObject();

		JSONObject jsonIn = null;
		try {
			jsonIn = (JSONObject) new JSONParser().parse(jsonitem);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Iterator<String> keys = jsonIn.keySet().iterator();
		JSONArray jsonArray = new JSONArray();
		while (keys.hasNext()) {
			String key = keys.next();
			Object obj = beanInstances.get(key);
			if (obj != null) {
				Class<?> clazz = getClass(obj.toString());
				MapObjectToJson<Object> MapObjectToJson = new MapObjectToJson<>(obj,clazz);
				JSONObject wrkJson = MapObjectToJson.getJson();
				jsonArray.add(wrkJson);
			}
		}
		jsonOut.put("html", "addFamilyTree.jsp");
		jsonOut.put("beans", jsonArray);
		
		return jsonOut;
	}
	@SuppressWarnings("unchecked")
	public JSONObject addFamilyTree(JSONObject inputJson, HashMap<String, Object> beanInstances) {
		JSONObject outJson = new JSONObject();
		FamilyTreeBean familyTreeBean = (FamilyTreeBean) beanInstances.get("familyTreeBean");
		JSONObject loginJson = familyTreeBean.getLoginJson();

		if (!verifydata(loginJson,outJson)) return outJson;
		
		inputJson.put("loginid", loginJson.get("id"));
		inputJson.put("createdate", System.currentTimeMillis());
		FamilyTree familyTree = new FamilyTree();
		MapJsonToObject mapJsonToObject = new MapJsonToObject();
		mapJsonToObject.fromJsonToClazz(familyTree,inputJson,familyTree.getClass().getDeclaredFields(),familyTree.getClass().getMethods());

		familyTreeDao.save(familyTree);
		outJson.put("srvcompleted", true);
		outJson.put("infomsg","");
		outJson.put("html","stepsToAddUsers.jsp");
		return outJson;
	}

	@SuppressWarnings("unchecked")
	private boolean verifydata(JSONObject loginJson, JSONObject outJson) {		
		outJson.put("srvcompleted", false);
		if (loginJson == null || loginJson.get("id") == null || ((String)loginJson.get("id")).length() == 0) {
			outJson.put("infomsg","You must login ....or your login has expired.");
			return false;
		}
		int levelRequested	= FamilyStatic.getAccessLevel(FamilyStatic.SYSADMIN);
		int loggedUserLevel	= FamilyStatic.getAccessLevel((String)loginJson.get("access"));
		if (loggedUserLevel < levelRequested) {
			outJson.put("infomsg","the current logged Id does not have sufficient authority to add/remove a Family");
			return false;
		}
		String loginid = (String)loginJson.get("id");
		FamilyTree familyTree = familyTreeDao.findByLoginid(Integer.valueOf(loginid));
		if (familyTree != null) {
			outJson.put("infomsg","Root for root-email="+loginJson.get("email")+" already exist");
			return false;
		}
		return true;
	}
	private Class<?> getClass(String name) {
	int ndx = name.indexOf('@');
	if (ndx != -1) name = name.substring(0,ndx);
	Class<?> clazz = null;
	try {
		clazz = Class.forName(name);
	} catch (ClassNotFoundException e) {
		e.printStackTrace();
	}
	return clazz;
}
	@SuppressWarnings("unchecked")
	private JSONObject BldContract() {
		JSONObject json = new JSONObject();
		json.put("loginid", loginRequirement);
		json.put("verifyemail",true);
		return json;
	}
}