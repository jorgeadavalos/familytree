package com.assoc.jad.familytree.jsonmapper;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Iterator;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;

public class MapJsonToObject {
	private static Log LOG = LogFactory.getLog(MapJsonToObject.class);
	
	private Object object;
	private Field[] fields;
	private Method[] methods;

	@SuppressWarnings("unchecked")
	public void fromJsonToClazz(Object object, JSONObject json,Field[] fields,Method[] methods) {
		if (object == null) return;
		
		this.object = object;
		this.fields = fields;
		this.methods = methods;
		
		Iterator<String> iter = json.keySet().iterator();
		while (iter.hasNext()) {
			String jsonkey = iter.next();
			Object value = (Object) json.get(jsonkey);

			findField(jsonkey,value);
		}
	}
	private void findField(String jsonkey,Object value) {
		
		for (int i=0;i<fields.length;i++) {
			if (jsonkey.equalsIgnoreCase(fields[i].getName())) {
				findMethod(object, fields[i].getName(),value);
				break;
			}
		}
	}
	private <T> void findMethod(Object instance, String fieldname,T value) {

		String methodName = "set"+fieldname;
		for (int i = 0; i < methods.length; i++) {
			String name = methods[i].getName();
			if (!name.startsWith("set")) continue;
			if (!name.equalsIgnoreCase(methodName)) continue;
			
			String argType = methods[i].getParameterTypes()[0].getName();
			methodParamsExecSetter(value,argType,methods[i]);
			
			break;
		}
	}
	private <T> void methodParamsExecSetter(T value,String argType,Method method) {
		
		if (value.getClass().getCanonicalName().equals("java.lang.String")) {		
			if (argType.equals("int") || argType.equals("java.lang.Integer") ) 
				executeSetters( method,Integer.valueOf(value.toString().toString()));
			else if (argType.equals("long")) executeSetters( method,Long.valueOf(value.toString()));
			else if (argType.equals("java.lang.String")) executeSetters(method,value);
			
		} else executeSetters(method,value);

//		argType.equals("long") ||
//		argType.equals("byte") ||
//		argType.equals("char") ||
//		argType.equals("short") ||
//		argType.equals("float") ||
//		argType.equals("double") ||
		
	}
	private <T> void executeSetters(Method method,T arg) {
		Object[] arguments = new Object[] {arg};
		try {
			method.invoke(object,arguments);
		} catch (Exception e) {
			String msg = "invoked method failed "+object.getClass().getName()+"."+method.getName()+" "+e;
			LOG.warn(msg);
		} 
	}
}
