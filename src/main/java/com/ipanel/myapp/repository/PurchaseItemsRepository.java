package com.ipanel.myapp.repository;

import com.ipanel.myapp.domain.PurchaseItems;

import com.ipanel.myapp.domain.Purchases;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PurchaseItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseItemsRepository extends JpaRepository<PurchaseItems, Long> {
    List<PurchaseItems> getAllByPurchaseCode(Purchases code);
}
