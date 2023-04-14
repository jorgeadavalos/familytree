package com.assoc.jad.familytree.model;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * This class represents a home network in our application's  model.
 * 
 * @author jad
 * 
 */
public class Members implements Comparable<Members>, Serializable {

	private static final long serialVersionUID = 1L;

	private int id;
	private int familyid;
	private int parentid;
	private String firstname;
	private String lastname;
	private String address;
	private String city;
	private String state;
	private String zipcode;
	private String country;
	private String mobile;
	private Timestamp createdate;
	private String email;

	public Members() {
	}

	public int compareTo(Members o) {
		return this.lastname.compareTo(o.lastname) ; //&& this.lastname.compareTo(o.lastname);
	}
	@Override
	public String toString() {
		return id+lastname;
	}

	public void setCreatedate(Timestamp createdate) {
		this.createdate = createdate;
	}

	public Timestamp getCreatedate() {
		return createdate;
	}

	public void setId(int id) {
		this.id = id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddress() {
		return address;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getState() {
		return state;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCountry() {
		return country;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCity() {
		return city;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public int getFamilyid() {
		return familyid;
	}

	public void setFamilyid(int familyid) {
		this.familyid = familyid;
	}
	public void setFamilyid(Integer familyid) {
		this.familyid = familyid;
	}

	public int getParentid() {
		return parentid;
	}

	public void setParentid(int parentid) {
		this.parentid = parentid;
	}
	public void setParentid(Integer parentid) {
		this.parentid = parentid;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

}
