package com.assoc.jad.familytree.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * This class represents a home network in our application's  model.
 * 
 * @author jad
 * 
 */
@Entity
@Table(name="familytrees")
public class FamilyTree implements Comparable<FamilyTree>, Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)	private int id;
	private int memberid1;
	private int memberid2;
	private String firstname1;
	private String lastname1;
	private String firstname2;
	private String lastname2;
	private long createdate;
	private String email;
	private int loginid;
	
	public int compareTo(FamilyTree o) {
		return this.lastname1.compareTo(o.lastname1); //&& this.lastname2.compareTo(o.lastname2);
	}
	@Override
	public String toString() {
		return id+lastname1+" "+lastname2;
	}

	public void setCreatedate(Long createdate) {
		this.createdate = createdate;
	}

	public Long getCreatedate() {
		return createdate;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getId() {
		return id;
	}
	public long getMemberid1() {
		return memberid1;
	}
	public void setMemberid1(int memberid1) {
		this.memberid1 = memberid1;
	}
	public void setMemberid1(Integer memberid1) {
		this.memberid1 = memberid1;
	}
	public int getMemberid2() {
		return memberid2;
	}
	public void setMemberid2(int memberid2) {
		this.memberid2 = memberid2;
	}
	public void setMemberid2(Integer memberid2) {
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
	public int getLoginid() {
		return loginid;
	}
	public void setLoginid(int loginid) {
		this.loginid = loginid;
	}
	public void setLoginid(Integer loginid) {
		this.loginid = loginid;
	}
}
