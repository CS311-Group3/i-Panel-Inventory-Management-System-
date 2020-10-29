package com.ipanel.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SalesItems.
 */
@Entity
@Table(name = "sales_items")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SalesItems implements Serializable {

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
    @JsonIgnoreProperties(value = "salesItems", allowSetters = true)
    private Inventory itemCode;


    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "items", allowSetters = true)
    private Sales salesCode;


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

    public SalesItems unitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public SalesItems quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getTotal() {
        return total;
    }

    public SalesItems total(Float total) {
        this.total = total;
        return this;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Inventory getItemCode() {
        return itemCode;
    }

    public SalesItems itemCode(Inventory inventory) {
        this.itemCode = inventory;
        return this;
    }

    public void setItemCode(Inventory inventory) {
        this.itemCode = inventory;
    }

    public Sales getSalesCode() {
        return salesCode;
    }

    public SalesItems salesCode(Sales sales) {
        this.salesCode = sales;
        return this;
    }

    public void setSalesCode(Sales sales) {
        this.salesCode = sales;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SalesItems)) {
            return false;
        }
        return id != null && id.equals(((SalesItems) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SalesItems{" +
            "id=" + getId() +
            ", unitPrice=" + getUnitPrice() +
            ", quantity=" + getQuantity() +
            ", total=" + getTotal() +
            "}";
    }
}
