package com.assoc.jad.familytree.tools;

import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Scanner;

public class FamilyStatic {
	public final static String SYSADMIN  			= "SYSADMIN"; //modify anything in the families DB
	public final static String FAMILYADMIN 			= "FAMILYADMIN"; //modify only its COOP in DB
	public final static String FAMILYUSER  			= "FAMILYUSER"; //views only??? not modify
	public final static String HTMLSNIPPET 			= "HTMLSNIPPET:";
	public final static String STEPSTOBUILDFAMILY	= "stepsToBuildFamily.xhtml";
	public final static String SELECTFAMILY			= "selectFamily.xhtml";
	public final static String LANDINGPAGE			= "bldLandingPage.xhtml";
	public final static String ADDMEMBERs			= "addFamilyTree.xhtml";
	
	public final static String emailNoFamily 		= "Email %s has no family associated with it. Start here";
	public final static String moreThanOneFamily 	= "Email %s has more than one family associated with it. Please select one";
	public final static String oneFamilySelected	= "Unique family selected for email '%s' %s %s %d";
	public final static String familyNull	 		= "There is no family for this request.Please enter email to search";
		
	private static enum AccessTable {
		FAMILYUSER,FAMILYADMIN,SYSADMIN
	}

	public static String getPartialURL() {
		String localIP="localhost";
		if (System.getProperty("com.assoc.jad.debug") != null && System.getProperty("com.assoc.jad.debug").equals("true")) {
			try {
				localIP = InetAddress.getLocalHost().getHostAddress();
			} catch (UnknownHostException e) {
				e.printStackTrace();
			}
			return "http://"+localIP+":8080/familytree";
		}
        return "http://"+System.getProperty("DOMAINNAME")+"/familytree"; 
//        return "http://"+FamilyStatic.getExternalIP()+":18080/familytree";

	}
	public static int getAccessLevel(String enumConstant) {
		int level = -1;
		try {
			level = AccessTable.valueOf(enumConstant).ordinal();
		} catch (IllegalArgumentException e) {
			level = -1;
		}
		return level;
	}
//	private static int getTempIdAccessPath(String enumConstant) {
//		int level = -1;
//		try {
//			level = TempIdAccess.valueOf(enumConstant).ordinal();
//		} catch (IllegalArgumentException e) {
//			level = -1;
//		}
//		return level;
//	}
//	public static boolean isLoggedInWithAccess(String requestedAccess) {
//		FacesContext context = FacesContext.getCurrentInstance();
//		ExternalContext external = context.getExternalContext();
//		HttpServletRequest request = (HttpServletRequest) external.getRequest();
//		LoginBean loginBean = (LoginBean) request.getSession().getAttribute("loginBean");
//		if (loginBean == null) return false;
//		
//		User loggedUser = loginBean.getUser();
//		if (loggedUser == null) return false;
//		
//		int levelRequested	= getAccessLevel(requestedAccess);
//		int loggedUserLevel	= getAccessLevel(loggedUser.getType());
//		if (loggedUserLevel >= levelRequested) return true;
//
//		return false;
//	}
//	public static boolean isLoggedInWithAccess(User loggedUser, String requestedAccess,String path) {
//		if (loggedUser == null) return false;
//		
//		if (loggedUser.getFirstname().startsWith("temp") && loggedUser.getLastname().startsWith("temp")) {
//			int ndx1 = path.lastIndexOf('/');
//			int ndx2 = path.indexOf('.');
//			if (ndx1 != -1) ndx1++;
//			else ndx1 = 0;
//			if (ndx2 == -1) ndx2 = path.length()-1;
//			
////			int levelRequested	= getTempIdAccessPath(path.substring(ndx1,ndx2));  	//skip forward slash
////			if (levelRequested == -1) return false;
//		}
//		return isLoggedInWithAccess(loggedUser, requestedAccess);
//	}
//	public static boolean isLoggedInWithAccess(User loggedUser, String requestedAccess) {
//		if (loggedUser == null) return false;
//		
//		int levelRequested	= getAccessLevel(requestedAccess);
//		int loggedUserLevel	= getAccessLevel(loggedUser.getAccess());
//		if (loggedUserLevel >= levelRequested) return true;
//
//		return false;
//	}
    public synchronized static String hashPasscode(String password) {

        MessageDigest md=null;
		try {
			md = MessageDigest.getInstance("SHA-256");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return "";
		}
        md.update(password.getBytes());

        byte byteData[] = md.digest(); 

        //convert the byte to hex format method 1
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }
    public static String specialChars(String parm) {
    	String outParm = parm.replaceAll("'", "&#39;");
    	return outParm;
    }
    public static String undoSpecialChars(String parm) {
    	if (parm == null) return "";
    	String outParm = parm.replaceAll("&#39;","'");
    	return outParm;
    }
//    public static void launchJettyServer() {
//		try {
//			JettyServer jettyServer = JettyServer.getInstance();
//			jettyServer.startJetty();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//    }
    public static String getSnippetSource(InputStream source) {
		String wrkstr = "";
		try {
			Scanner scanner = new Scanner(source);
			while (scanner.hasNextLine()) {
				wrkstr += scanner.nextLine()+System.getProperty("line.separator");
			}
			scanner.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return wrkstr;
	}
//    public synchronized static String setFamilyKey(FamilyTree family) {
//    	return family.getLastname1()+"."+family.getLastname2()+"."+family.getId();
//    }
//    public static synchronized void redirect(String parm) {
//		
//		ExternalContext external = FacesContext.getCurrentInstance().getExternalContext();
//		HttpServletResponse resp = (HttpServletResponse) external.getResponse();
//		if ( external.isResponseCommitted()) return;
//		
//		String currentPage = ((HttpServletRequest) external.getRequest()).getRequestURI();
//		if (parm == null || parm.length() == 0) parm = currentPage;
//		if (parm.length() > 0 && currentPage.indexOf(parm) != -1) {
//			return;
//		}
//		
//		try {
//			resp.sendRedirect(parm);
//		} catch (IOException e) {
//			e.printStackTrace();
//			return;
//		}
//	}
//	public synchronized static String callbackObject(Object obj) {
//		ExternalContext external = FacesContext.getCurrentInstance().getExternalContext();
//		HttpServletRequest request = (HttpServletRequest) external.getRequest();
//		BeanInterface parentInterfaceBean = (BeanInterface) request.getSession().getAttribute("parentInterfaceBean");
//		if (parentInterfaceBean != null) return null;
//		request.getSession().setAttribute("parentInterfaceBean",obj);
//		return request.getServletPath().substring(1);
//
//	}
	
}	