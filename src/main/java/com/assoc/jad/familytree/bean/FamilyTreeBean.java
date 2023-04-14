package com.assoc.jad.familytree.bean;

import javax.annotation.ManagedBean;

import org.json.simple.JSONObject;
import org.springframework.web.context.annotation.SessionScope;

import com.assoc.jad.familytree.model.FamilyTree;

@ManagedBean
@SessionScope
public class FamilyTreeBean {
	private JSONObject loginJson;		//old ref: private LoginBean loginBean;
	private FamilyTree family = new FamilyTree();
/*
 * getters and setters
 */
	public JSONObject getLoginJson() {
		return loginJson;
	}
	public void setLoginJson(JSONObject loginJson) {
		this.loginJson = loginJson;
	}
	public FamilyTree getFamily() {
		return family;
	}
	public void setFamily(FamilyTree family) {
		this.family = family;
	}

}
