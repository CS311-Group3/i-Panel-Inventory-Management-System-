package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Inventory;

import io.swagger.models.auth.In;
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

}
