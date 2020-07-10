package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Purchases;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Purchases entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchasesRepository extends JpaRepository<Purchases, Long> {
}
