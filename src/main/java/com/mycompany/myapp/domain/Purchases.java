package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Purchases.
 */
@Entity
@Table(name = "purchases")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Purchases implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total")
    private Float total;

    @Column(name = "discounts")
    private Float discounts;

    @Column(name = "date_of_purchase")
    private LocalDate dateOfPurchase;

    @OneToOne
    @JoinColumn(unique = true)
    private Vendor vendorID;

    @OneToMany(mappedBy = "purchaseCode")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<PurchaseItems> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTotal() {
        return total;
    }

    public Purchases total(Float total) {
        this.total = total;
        return this;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Float getDiscounts() {
        return discounts;
    }

    public Purchases discounts(Float discounts) {
        this.discounts = discounts;
        return this;
    }

    public void setDiscounts(Float discounts) {
        this.discounts = discounts;
    }

    public LocalDate getDateOfPurchase() {
        return dateOfPurchase;
    }

    public Purchases dateOfPurchase(LocalDate dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
        return this;
    }

    public void setDateOfPurchase(LocalDate dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public Vendor getVendorID() {
        return vendorID;
    }

    public Purchases vendorID(Vendor vendor) {
        this.vendorID = vendor;
        return this;
    }

    public void setVendorID(Vendor vendor) {
        this.vendorID = vendor;
    }

    public Set<PurchaseItems> getItems() {
        return items;
    }

    public Purchases items(Set<PurchaseItems> purchaseItems) {
        this.items = purchaseItems;
        return this;
    }

    public Purchases addItems(PurchaseItems purchaseItems) {
        this.items.add(purchaseItems);
        purchaseItems.setPurchaseCode(this);
        return this;
    }

    public Purchases removeItems(PurchaseItems purchaseItems) {
        this.items.remove(purchaseItems);
        purchaseItems.setPurchaseCode(null);
        return this;
    }

    public void setItems(Set<PurchaseItems> purchaseItems) {
        this.items = purchaseItems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Purchases)) {
            return false;
        }
        return id != null && id.equals(((Purchases) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Purchases{" +
            "id=" + getId() +
            ", total=" + getTotal() +
            ", discounts=" + getDiscounts() +
            ", dateOfPurchase='" + getDateOfPurchase() + "'" +
            "}";
    }
}
