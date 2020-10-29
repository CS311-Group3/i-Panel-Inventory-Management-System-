package com.ipanel.myapp.repository;

import com.ipanel.myapp.domain.UserDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
}
