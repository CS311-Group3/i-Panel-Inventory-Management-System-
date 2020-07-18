package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Inventory;
import com.mycompany.myapp.domain.PurchaseItems;
import com.mycompany.myapp.domain.Purchases;
import com.mycompany.myapp.repository.InventoryRepository;
import com.mycompany.myapp.repository.PurchaseItemsRepository;
import com.mycompany.myapp.repository.PurchasesRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Purchases}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PurchasesResource {

    private final Logger log = LoggerFactory.getLogger(PurchasesResource.class);

    private static final String ENTITY_NAME = "purchases";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PurchasesRepository purchasesRepository;
    private final InventoryRepository inventoryRepository;
    private final PurchaseItemsRepository purchaseItemsRepository;
    public PurchasesResource(PurchasesRepository purchasesRepository,PurchaseItemsRepository purchaseItemsRepository,InventoryRepository inventoryRepository) {
        this.purchasesRepository = purchasesRepository;
        this.purchaseItemsRepository = purchaseItemsRepository;
        this.inventoryRepository = inventoryRepository;
    }

    /**
     * {@code POST  /purchases} : Create a new purchases.
     *
     * @param purchases the purchases to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new purchases, or with status {@code 400 (Bad Request)} if the purchases has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/purchases")
    public ResponseEntity<Purchases> createPurchases(@RequestBody Purchases purchases) throws URISyntaxException {
        log.debug("REST request to save Purchases : {}", purchases);
        if (purchases.getId() != null) {
            throw new BadRequestAlertException("A new purchases cannot already have an ID", ENTITY_NAME, "idexists");
        }
        for (PurchaseItems item : purchases.getItems()){
            item.setPurchaseCode(purchases);
            purchaseItemsRepository.save(item);
            Inventory inventoryItem = item.getItemCode();
            inventoryItem.setQuantity(item.getQuantity() + inventoryItem.getQuantity());
            inventoryRepository.save(inventoryItem);
        }
        purchases.setDateOfPurchase(LocalDate.now());
        Purchases result = purchasesRepository.save(purchases);
        return ResponseEntity.created(new URI("/api/purchases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /purchases} : Updates an existing purchases.
     *
     * @param purchases the purchases to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purchases,
     * or with status {@code 400 (Bad Request)} if the purchases is not valid,
     * or with status {@code 500 (Internal Server Error)} if the purchases couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/purchases")
    public ResponseEntity<Purchases> updatePurchases(@RequestBody Purchases purchases) throws URISyntaxException {
        log.debug("REST request to update Purchases : {}", purchases);
        if (purchases.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Purchases result = purchasesRepository.save(purchases);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, purchases.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /purchases} : get all the purchases.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of purchases in body.
     */
    @GetMapping("/purchases")
    public ResponseEntity<List<Purchases>> getAllPurchases(Pageable pageable) {
        log.debug("REST request to get a page of Purchases");
        Page<Purchases> page = purchasesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }



    /**
     * {@code GET  /purchases/:id} : get the "id" purchases.
     *
     * @param id the id of the purchases to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the purchases, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/purchases/{id}")
    public ResponseEntity<Purchases> getPurchases(@PathVariable Long id) {
        log.debug("REST request to get Purchases : {}", id);
        Optional<Purchases> purchases = purchasesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(purchases);
    }

    /**
     * {@code DELETE  /purchases/:id} : delete the "id" purchases.
     *
     * @param id the id of the purchases to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/purchases/{id}")
    public ResponseEntity<Void> deletePurchases(@PathVariable Long id) {
        log.debug("REST request to delete Purchases : {}", id);

        purchasesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
