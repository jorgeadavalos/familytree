package com.assoc.jad.familytree.model;

import java.io.Serializable;

/**
 * This class represents an MTM mapping for members table and photos in our application's  model.
 * 
 * @author jad
 * 
 */
public class Members_photos implements Serializable {

	private static final long serialVersionUID = 1L;

	private long id;
	private long memberid;
	private long familyid;
	private long photoid;
	private String name;

	public Members_photos() {
	}

	@Override
	public String toString() {
		return Long.toString(id);
	}

	public void setId(Long id) {
		this.id = id.longValue();
	}
	public void setId(Integer id) {
		this.id = id.longValue();
	}
	public long getId() {
		return id;
	}
	public long getMemberid() {
		return memberid;
	}
	public void setMemberid(long memberid) {
		this.memberid = memberid;
	}
	public void setMemberid(Long memberid) {
		this.memberid = memberid;
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
	public long getPhotoid() {
		return photoid;
	}
	public void setPhotoid(long photoid) {
		this.photoid = photoid;
	}
	public void setPhotoid(Long photoid) {
		this.photoid = photoid;
	}
	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
