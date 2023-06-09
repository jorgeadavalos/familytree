package com.assoc.jad.familytree.tools;

import java.util.Scanner;

import javax.servlet.ServletContextEvent;

public class Configuration implements javax.servlet.ServletContextListener {

	private void setSystemProperties(String line) {
		int ndx = line.indexOf("=");
		if (ndx == -1) return;

		System.setProperty(line.substring(0, ndx), line.substring(ndx + 1));
	}

	private void readConfigFile(String filename) {
		try {
			Scanner scanner = new Scanner(getClass().getResourceAsStream("/" + filename));
			while (scanner.hasNextLine()) {
				String wrkstr = scanner.nextLine().trim();
				if (wrkstr.length() == 0) continue;
				if (wrkstr.startsWith("#")) continue;
				
				String[] strArray = wrkstr.split(" ");
				
				if (strArray[0].startsWith("-D")) setSystemProperties(strArray[1]);
			}
			scanner.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		//readConfigFile("webAppConfig.properties");
		//TODO FamilyStatic.launchJettyServer();  
	}

}
