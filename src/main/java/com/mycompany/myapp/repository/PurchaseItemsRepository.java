package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PurchaseItems;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PurchaseItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseItemsRepository extends JpaRepository<PurchaseItems, Long> {
}
