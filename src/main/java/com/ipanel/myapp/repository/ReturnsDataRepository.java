package com.ipanel.myapp.repository;

import com.ipanel.myapp.domain.ReturnsData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ReturnsData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReturnsDataRepository extends JpaRepository<ReturnsData, Long> {
}
