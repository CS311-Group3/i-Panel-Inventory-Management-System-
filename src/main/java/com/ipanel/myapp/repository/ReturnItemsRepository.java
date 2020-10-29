package com.ipanel.myapp.repository;

import com.ipanel.myapp.domain.ReturnItems;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ReturnItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReturnItemsRepository extends JpaRepository<ReturnItems, Long> {
    List<ReturnItems> getAllByReturnCode(String code);
}
