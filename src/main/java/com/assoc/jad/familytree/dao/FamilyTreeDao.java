package com.assoc.jad.familytree.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assoc.jad.familytree.model.FamilyTree;

public interface FamilyTreeDao extends JpaRepository<FamilyTree, Integer> {
	
	List<FamilyTree> findByEmail(String email);
	FamilyTree findByLoginid(int id);
//	
//	@Query("from Artists where showentrant=?1 order by ?2")
//	List<Artists> findByAllOrdered(boolean flag,String sql);
//	List<Artists> findByIdGreaterThan(long id);

}
