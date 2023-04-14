package com.assoc.jad.familytree.model;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * This class represents a home network in our application's  model.
 * 
 * @author jad
 * 
 */
public class Parents implements Comparable<Parents>, Serializable {

	private static final long serialVersionUID = 1L;

	private long 	id;
	private long 	familyid;
	private long 	memberid1;
	private long 	memberid2;
	private String	firstname1;
	private String 	lastname1;
	private String 	firstname2;
	private String 	lastname2;
	private Timestamp createdate;
	private String email;
	
	public Parents() {
	}

	public int compareTo(Parents o) {
		return this.lastname1.compareTo(o.lastname1); //&& this.lastname2.compareTo(o.lastname2);
	}
	@Override
	public String toString() {
		return id+lastname1+" "+lastname2;
	}

	public void setCreatedate(Timestamp createdate) {
		this.createdate = createdate;
	}

	public Timestamp getCreatedate() {
		return createdate;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}


	public long getMemberid1() {
		return memberid1;
	}

	public void setMemberid1(long memberid1) {
		this.memberid1 = memberid1;
	}
	public void setMemberid1(Long memberid1) {
		this.memberid1 = memberid1;
	}

	public long getMemberid2() {
		return memberid2;
	}

	public void setMemberid2(long memberid2) {
		this.memberid2 = memberid2;
	}
	public void setMemberid2(Long memberid2) {
		this.memberid2 = memberid2;
	}

	public void setFirstname1(String firstname1) {
		this.firstname1 = firstname1;
	}
	public String getFirstname1() {
		return firstname1;
	}
	public void setLastname1(String lastname) {
		this.lastname1 = lastname;
	}
	public String getLastname1() {
		return lastname1;
	}

	public String getFirstname2() {
		return firstname2;
	}
	public void setFirstname2(String firstname2) {
		this.firstname2 = firstname2;
	}
	public String getLastname2() {
		return lastname2;
	}
	public void setLastname2(String lastname2) {
		this.lastname2 = lastname2;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public long getFamilyid() {
		return familyid;
	}

	public void setFamilyid(long familyid) {
		this.familyid = familyid;
	}
	public void setFamilyid(Long familyid) {
		this.familyid = familyid;
	}
}
