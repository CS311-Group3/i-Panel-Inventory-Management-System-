package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PurchaseItems;
import com.mycompany.myapp.domain.Purchases;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

/**
 * Spring Data  repository for the Purchases entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchasesRepository extends JpaRepository<Purchases, Long> {
    List<Purchases> getAllByDateOfPurchaseOrderByIdDesc(LocalDate date);
}

