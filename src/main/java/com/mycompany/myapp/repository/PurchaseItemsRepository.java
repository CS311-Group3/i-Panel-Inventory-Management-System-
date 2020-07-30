package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PurchaseItems;

import com.mycompany.myapp.domain.Purchases;
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
