package com.assoc.jad.familytree.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;

import com.assoc.jad.familytree.bean.FamilyTreeBean;

public abstract class ARESTMethods {
	private static final Log LOG = LogFactory.getLog(ARESTMethods.class);
	
////	@Autowired
//	private LoginRoot loginRoot;
//	@Autowired
//	private LoadFilesBean loadFilesBean;
	@Autowired
	private FamilyTreeBean familyTreeBean;
////	@Autowired
//	private UserBean userBean;

	private JSONObject jsonitem;

	private Method selectMethod(String name,Method[] methods) {
		for (int i = 0; i < methods.length; i++) {
			String wrkname = methods[i].getName();
			if (!wrkname.equalsIgnoreCase(name)) continue;

			return methods[i];
		}
		return null;
	}
	protected Method getRequestInfo(HttpServletRequest request,Method[] methods) {
		String name=request.getPathInfo();
		String previousRandom = (String) request.getSession().getAttribute("previousRandom");
		String random = request.getParameter("random");
		try {
			String decoded = URLDecoder.decode(request.getParameter("jsonitem"), "UTF-8");
			setJsonitem((JSONObject) new JSONParser().parse(decoded));
		} catch (UnsupportedEncodingException | ParseException e) {
			e.printStackTrace();
		}

		if (name == null || (previousRandom != null && (random != null && random.equals(previousRandom)) )) return null;
		if (random != null) previousRandom = random;
		request.getSession().setAttribute("previousRandom",previousRandom);
		
		name = name.substring(1);
		Method method = selectMethod(name,methods);
		if (method == null) 
			LOG.info("Method '"+name+"' not found usin URI='"+request.getRequestURI()+" "+request.getQueryString());
		
		return method;
	}
	protected Object executeMethod(Method method,Object obj,Object instance) {
		Object[] arguments = null;
		Object retObj = null;
		if (obj != null) arguments = new Object[] {obj};

		try {
			retObj = method.invoke(instance,arguments);
		} catch (Exception e) {
			String msg = "invoked method failed "+instance.getClass().getName()+"."+method.getName()+" "+e;
			LOG.warn(msg);
		} 
		return retObj;
	}
	protected void sendAsJson(String data,HttpServletResponse response) {
		response.setContentType("application/json;charset=UTF-8");
		response.setContentLength(data.length());
		try {
			response.getOutputStream().write(data.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	/*
	 * getters and setters
	 */
	public JSONObject getJsonitem() {
		return jsonitem;
	}
	public void setJsonitem(JSONObject jsonitem) {
		this.jsonitem = jsonitem;
	}
}
