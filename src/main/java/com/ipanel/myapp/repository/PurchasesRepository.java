package com.ipanel.myapp.repository;

import com.ipanel.myapp.domain.Purchases;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data  repository for the Purchases entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchasesRepository extends JpaRepository<Purchases, Long> {
    List<Purchases> getAllByDateOfPurchaseOrderByIdDesc(LocalDate date);
}

