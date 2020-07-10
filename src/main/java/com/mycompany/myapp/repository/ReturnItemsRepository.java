package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ReturnItems;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ReturnItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReturnItemsRepository extends JpaRepository<ReturnItems, Long> {
}
