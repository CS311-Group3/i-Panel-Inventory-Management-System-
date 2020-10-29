package com.ipanel.myapp.repository;

import com.ipanel.myapp.domain.SalesItems;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SalesItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalesItemsRepository extends JpaRepository<SalesItems, Long> {
    List<SalesItems> getAllBySalesCode(String code);
}
