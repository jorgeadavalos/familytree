package com.assoc.jad.familytree.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/EMAIL")
public class RestEmail {
	
	private String infomsg;
	
	@SuppressWarnings("unchecked")
	@GetMapping("/getFamily/{jsonitem}")
	@ResponseBody
	public String loginReq(HttpServletResponse resp,HttpServletRequest req,@PathVariable("jsonitem") String jsonitem) {
		JSONObject json = new JSONObject();
		infomsg = "";
		String restURL = "https://localhost:28089/login";
		json.put("html",restURL);
		json.put("infomsg",infomsg);
		json.put("callbackurl",req.getRequestURL().toString());
		json.put("service","familyTree");
		json.put("loginid","email");		//TODO
		return json.toJSONString();
	}

}
