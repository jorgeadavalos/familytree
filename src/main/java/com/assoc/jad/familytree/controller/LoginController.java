package com.assoc.jad.familytree.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.assoc.jad.familytree.bean.FamilyTreeBean;
import com.assoc.jad.familytree.dao.FamilyTreeDao;
import com.assoc.jad.familytree.service.FamilyTreeService;
import com.assoc.jad.familytree.service.LoginService;

@RestController
@RequestMapping("/familyTreeLogin")
public class LoginController {

	//private static final Log LOG = LogFactory.getLog(RESTServlet.class);

	private String infomsg;
	
	@Autowired
	FamilyTreeDao familyTreeDao;
	@Autowired
	LoginService loginService;
	@Autowired
	FamilyTreeBean familyTreeBean;

	private HashMap<String,Object> beanInstances = new HashMap<>();


	@GetMapping("/login/{jsonitem}")
	public String loginReq(HttpServletResponse resp,HttpServletRequest req,@PathVariable("jsonitem") String jsonitem) {
		
		JSONObject json = loginService.loginReq(req);
		return json.toJSONString();
	}
	@GetMapping("/register")
	@ResponseBody
	public String registerReq(HttpServletResponse resp,HttpServletRequest req) {
		
		JSONObject json = loginService.registerReq(req);
		return json.toJSONString();
	}
	@PostMapping("/loginRegister")
	public String loginRegister(@RequestBody JSONObject json) {
		familyTreeBean.setLoginJson(json);
		return json.toJSONString();
	}
	@PostMapping("/add/familytree")
	public String addFamilyTree(@RequestBody JSONObject json) {
		if (beanInstances.size() == 0) initInstances();
		JSONObject jsonOut = loginService.addFamilyTree(json,beanInstances);
		return jsonOut.toJSONString();
	}
	
	@GetMapping("/beans")
	public String getBeans(@RequestParam String jsonitem ) {
		if (beanInstances.size() == 0) initInstances();

		FamilyTreeService loginService = new FamilyTreeService();
		JSONObject jsonOut = loginService.bldBeans(jsonitem,beanInstances);
		return jsonOut.toJSONString();
	}
	private void initInstances() {
		beanInstances.put("familyTreeBean", familyTreeBean);
	}
/*
 * getters and setters
 */
		public String getInfomsg() {
			return infomsg;
		}
		public void setInfomsg(String infomsg) {
			this.infomsg = infomsg;
		}
	
//	@SuppressWarnings("unchecked")
//	public String displayPhoto() {
//		UserDB userDB = loginRoot.getUserDB();
//		String email = (String)getJsonitem().get("email");
//		if (email == null) {
//			email = userDB.getUser().getEmail();
//			if (email == null) return "";
//		}
//		
//		byte[] photo = userBean.getLoginPhoto().getPhoto();
//		if (photo == null || !email.equalsIgnoreCase(userDB.getUser().getEmail())) {
//			userDB.getUser().setEmail(email);
//			userDB.setUser(userDB.getUserviaEmail());
//			loginRoot.setUserHasPhoto(false);
//			if (loginRoot.hasPhoto()) photo = userBean.getLoginPhoto().getPhoto();
//		}
//		JSONObject json = new JSONObject();
//		json.put("infomsg", infomsg);
//		if (photo == null || photo.length == 0) {
//			infomsg = "There is no photo for email="+email;
//			json.put("infomsg", infomsg);
//			return json.toJSONString();
//		}
//		
//		String ext = "jpg";
//		String photoName = userBean.getLoginPhoto().getName();
//		int ndx = photoName.lastIndexOf('.');
//		if (ndx != -1) ext = photoName.substring(++ndx);
//		json.put("photo", "data:image/"+ext+";base64,"+ Base64.getEncoder().encodeToString(photo));
//		return json.toJSONString();
//	}
//	@GetMapping("/isRegistered/{email}")
//	@ResponseBody
//	@SuppressWarnings("unchecked")
//	public String isUserAlreadyRegistered(HttpServletResponse resp,HttpServletRequest req,@PathVariable("email") String email) {
//		infomsg = "";
//
//		JSONObject json = new JSONObject();
//		json.put("isregistered", false);
//		if(loginRoot.isRegistered(email)) {
//			infomsg = "user with email='"+email+"' is already registerred. Please enter a different email... ";
//			json.put("isregistered", true);
//			json.put("infomsg",infomsg);
//		} else {							//TODO complete building user
//			User user = new User();
//			user.setEmail(email);
//			loginRoot.verifyUserEmail(user);
//			json.put("infomsg", loginRoot.getInfomsg());
//		}
//		return json.toJSONString();
//	}
//	@SuppressWarnings("unchecked")
//	public String confirmEmail() {
//		String sessionid = "";
//		JSONObject json = new JSONObject();
//		User user = null;
//		try {
//			String jsonstr = request.getParameter("jsonitem");
//			JSONObject wrkJson = (JSONObject) new JSONParser().parse(jsonstr);
//			sessionid = (String) wrkJson.get("sessionid");
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//
//		if (sessionid != null && sessionid.length() > 0) user = loginRoot.retrieveUser(sessionid);
//		if (user == null) {
//			infomsg = "expired session with sessionid="+sessionid;
//			json.put("infomsg", infomsg);
//			json.put("html", "index.jsp");
//			return json.toJSONString();
//		}
//		if (registerUser(user)) {
//			readFamilyTree(user);
//			FamilyTreeBean originalClass = new FamilyTreeBean();
//			MapObjectToJson<FamilyTreeBean> MapObjectToJson = new MapObjectToJson<>(familyTreeBean,originalClass.getClass());
//			JSONArray jsonArray = new JSONArray();
//			JSONObject wrkJson = MapObjectToJson.getJson();
//			jsonArray.add(wrkJson);
//			json.put("html", "addFamilyTree.jsp");
//			json.put(wrkJson.get("beanname"), jsonArray);
//		}
//		json.put("infomsg",infomsg);
//		return json.toJSONString();
//	}
//	@SuppressWarnings("unchecked")
//	public String login() {
//		JSONObject json = new JSONObject();
//		infomsg = "request made to login api";
//		LoginBean.returnHTML = request.getContextPath()+"/selectFamily.jsp";
//		json.put("html",System.getProperty("LOGINHTML"));
//		json.put("infomsg",infomsg);
//		return json.toJSONString();
//    }
//	/*
//	 * access familytree record if it already exist then set read only flag to prevent user from modifying it.
//	 */
//	@SuppressWarnings("unchecked")
//	private void readFamilyTree(User user) {
//		FamilyTreeDB familyTreeDB = new FamilyTreeDB();
//		String email = user.getEmail();
//		List<Object> wrkList = familyTreeDB.getfamilyWithEmail(email);
//		familyTreeBean.setReadonly(true);
//		if (wrkList.size() == 0) familyTreeBean.setReadonly(false);
//		familyTreeBean.setEmail(email);
//	}
//	private boolean registerUser(User user) {
//		loginRoot.register(user);
//		infomsg = loginRoot.getInfomsg();
//		if (loginRoot.isLoggedin()) {
//			userBean.setUser(user);
//			if (loadFilesBean.getUploadedFile() != null) {
//				LoginPhotos loginPhoto = loginRoot.registerAddPhotoToDB(loadFilesBean.getUploadedFile(),loadFilesBean.getData(),user);
//				userBean.setLoginPhoto(loginPhoto);
//				infomsg = loginRoot.getInfomsg()+" ";
//			}
//			infomsg += "Registered successfully email="+user.getEmail()+" to database";
//		}
//		return loginRoot.isLoggedin();
//	}
}
