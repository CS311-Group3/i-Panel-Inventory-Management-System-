package com.ipanel.myapp.repository;

import com.ipanel.myapp.domain.Inventory;

import com.ipanel.myapp.domain.enumeration.Category;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Inventory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findAllByItemCodeContains(String code);

    List<Inventory> findAllByItemNameContains(String name);

    List<Inventory> findAllByCategory(Category category);

    List<Inventory> findAllByItemCodeContainsAndItemNameContains(String code,String name);

    List<Inventory> findAllByItemCodeContainsAndCategory(String code,Category category);

    List<Inventory> findAllByItemNameContainsAndCategory(String name,Category category);

    List<Inventory> findAllByItemCodeContainsAndItemNameContainsAndCategory(String code,String name,Category category);

}
