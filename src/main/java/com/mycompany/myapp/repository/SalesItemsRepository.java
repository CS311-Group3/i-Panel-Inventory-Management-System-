package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SalesItems;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SalesItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalesItemsRepository extends JpaRepository<SalesItems, Long> {
}
