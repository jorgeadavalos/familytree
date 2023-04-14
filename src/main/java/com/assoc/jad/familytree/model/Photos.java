package com.assoc.jad.familytree.model;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * This class represents a home network in our application's  model.
 * 
 * @author jad
 * 
 */
public class Photos implements Comparable<Photos>, Serializable {

	private static final long serialVersionUID = 1L;

	private long id;
	private String name;
	private Timestamp createdate;
	private byte[] photo = null;

	public Photos() {
	}

	public int compareTo(Photos o) {
		return this.name.compareTo(o.name) ; //&& this.lastname.compareTo(o.lastname);
	}
	@Override
	public String toString() {
		return id+name;
	}

	public void setCreatedate(Timestamp createdate) {
		this.createdate = createdate;
	}

	public Timestamp getCreatedate() {
		return createdate;
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
	public byte[] getPhoto() {
		return photo;
	}
	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
