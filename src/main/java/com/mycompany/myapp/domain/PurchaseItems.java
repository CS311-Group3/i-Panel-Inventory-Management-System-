package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PurchaseItems.
 */
@Entity
@Table(name = "purchase_items")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PurchaseItems implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_price")
    private Float unitPrice;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "total")
    private Float total;

    @ManyToOne
    @JsonIgnoreProperties(value = "purchaseItems", allowSetters = true)
    private Inventory itemCode;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "items", allowSetters = true)
    private Purchases purchaseCode;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public PurchaseItems unitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public PurchaseItems quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getTotal() {
        return total;
    }

    public PurchaseItems total(Float total) {
        this.total = total;
        return this;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Inventory getItemCode() {
        return itemCode;
    }

    public PurchaseItems itemCode(Inventory inventory) {
        this.itemCode = inventory;
        return this;
    }

    public void setItemCode(Inventory inventory) {
        this.itemCode = inventory;
    }

    public Purchases getPurchaseCode() {
        return purchaseCode;
    }

    public PurchaseItems purchaseCode(Purchases purchases) {
        this.purchaseCode = purchases;
        return this;
    }

    public void setPurchaseCode(Purchases purchases) {
        this.purchaseCode = purchases;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseItems)) {
            return false;
        }
        return id != null && id.equals(((PurchaseItems) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchaseItems{" +
            "id=" + getId() +
            ", unitPrice=" + getUnitPrice() +
            ", quantity=" + getQuantity() +
            ", total=" + getTotal() +
            "}";
    }
}
