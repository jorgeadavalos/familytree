package com.assoc.jad.familytree.controller;

//import java.lang.reflect.Method;
//import java.util.Base64;
//import java.util.HashMap;
//
//import javax.servlet.ServletInputStream;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//
//import com.assoc.jad.login.LoginRoot;
//import com.assoc.jad.login.UserBean;
//import com.assoc.jad.login.repository.LoginPhotosDB;
//import com.assoc.jad.login.repository.model.LoginPhotos;
//import com.assoc.jad.login.repository.model.User;

@RestController
@RequestMapping("/REST2")
public class ImplementPOST extends ARESTMethods {
//
//	private HttpServletRequest request;
//	private HttpServletResponse response;
//	private LoginRoot loginRoot;
//	private LoadFilesBean loadFilesBean;
//	private FamilyTreeBean familyTreeBean;
//	private UserBean userBean;
//	
//	private Method[] methods = this.getClass().getMethods();
//	private String infomsg;
//
//	public ImplementPOST(HashMap<String,Object> inputs) {
//		this.request = (HttpServletRequest) inputs.get("request");
//		this.response = (HttpServletResponse) inputs.get("response");
//		this.loginRoot = (LoginRoot) inputs.get("loginRoot");
//		this.loadFilesBean = (LoadFilesBean) inputs.get("loadFilesBean");
//		this.familyTreeBean = (FamilyTreeBean) inputs.get("familyTreeBean");
//		this.userBean = (UserBean) inputs.get("userBean");
//	}
//	
//	@Override
//	public void run() {	
//		Method method = getRequestInfo(request,methods);
//		if (method != null) {
//			Object obj = executeMethod( method,null,this);
//			if (obj != null) sendAsJson((String)obj, response);
//		}
//	}
//	/*
//	 * when Registering is requested:
//	 * 1. check if user already exist. refuse to update photo if user exist
//	 */
//	@SuppressWarnings("unchecked")
//	public String registerPhoto() {
//		JSONObject json = new JSONObject();
//		String email = (String)getJsonitem().get("email");
//		String psw = (String)getJsonitem().get("psw");
//		if (!registerVerifyParms(json,email)) return json.toJSONString();
//		
//		User user = userBean.getUser();
//		if (user == null) {
//			user = new User();
//			userBean.setUser(user);
//		}
//		user.setEmail(email);
//		user.setUserid(email);
//		user.setPassword(psw);
//		user = loginRoot.addUser(user);
//		infomsg = loginRoot.getMessage();
//
//		json.put("infomsg", "invalid user id="+user.getId());
//		if (user.getId() <= 0)   return json.toJSONString();
//		
//		FamilyTree	family = new FamilyTree();
//		
//		family.setEmail(email);
//		familyTreeBean.setFamily(family);
//		
//		LoginPhotos loginPhoto = loginRoot.registerAddPhotoToDB(loadFilesBean.getUploadedFile(),loadFilesBean.getData(),user);
//		infomsg += loginRoot.getMessage();
//		String ext = "jpg";
//		String photoName = loginPhoto.getName();
//		int ndx = photoName.lastIndexOf('.');
//		if (ndx != -1) ext = photoName.substring(++ndx);
//		json.put("photo", "data:image/"+ext+";base64,"+ Base64.getEncoder().encodeToString(loginPhoto.getPhoto()));
//
//		json.put("infomsg", infomsg);
//		return json.toJSONString();
//	}
//	@SuppressWarnings("unchecked")
//	private boolean registerVerifyParms(JSONObject json,String email) {
//		infomsg = "";
//		json.put("infomsg", "email value is not passed to serverApp....");
//		if (email == null || email.length() == 0) return false;
//		json.put("infomsg", "there is no uploaded image/file");
//		if (loadFilesBean.getUploadedFile() == null) return false;
//		
////		User user = userBean.getUser();
////		json.put("infomsg", "input parameter 'email' doesn't match userBean email");
////		if (user != null && user.getEmail() != null)
////			if (!email.equals(user.getEmail()))  return false;
//		
//		return true;
//	}
//	/*
//	 * getters and setters
//	 */
//	public String getInfomsg() {
//		return infomsg;
//	}
//	public void setInfomsg(String infomsg) {
//		this.infomsg = infomsg;
//	}

}
