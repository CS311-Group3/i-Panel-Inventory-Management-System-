package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Sales.
 */
@Entity
@Table(name = "sales")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sales implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total")
    private Float total;

    @Column(name = "service_charges")
    private Float serviceCharges;

    @Column(name = "date_of_sale")
    private LocalDate dateOfSale;

    @OneToOne
    @JoinColumn(unique = true)
    private CustomerDetails customerID;

    @OneToMany(mappedBy = "salesCode")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SalesItems> items = new HashSet<>();

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

    public Sales total(Float total) {
        this.total = total;
        return this;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Float getServiceCharges() {
        return serviceCharges;
    }

    public Sales serviceCharges(Float serviceCharges) {
        this.serviceCharges = serviceCharges;
        return this;
    }

    public void setServiceCharges(Float serviceCharges) {
        this.serviceCharges = serviceCharges;
    }

    public LocalDate getDateOfSale() {
        return dateOfSale;
    }

    public Sales dateOfSale(LocalDate dateOfSale) {
        this.dateOfSale = dateOfSale;
        return this;
    }

    public void setDateOfSale(LocalDate dateOfSale) {
        this.dateOfSale = dateOfSale;
    }

    public CustomerDetails getCustomerID() {
        return customerID;
    }

    public Sales customerID(CustomerDetails customerDetails) {
        this.customerID = customerDetails;
        return this;
    }

    public void setCustomerID(CustomerDetails customerDetails) {
        this.customerID = customerDetails;
    }

    public Set<SalesItems> getItems() {
        return items;
    }

    public Sales items(Set<SalesItems> salesItems) {
        this.items = salesItems;
        return this;
    }

    public Sales addItems(SalesItems salesItems) {
        this.items.add(salesItems);
        salesItems.setSalesCode(this);
        return this;
    }

    public Sales removeItems(SalesItems salesItems) {
        this.items.remove(salesItems);
        salesItems.setSalesCode(null);
        return this;
    }

    public void setItems(Set<SalesItems> salesItems) {
        this.items = salesItems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sales)) {
            return false;
        }
        return id != null && id.equals(((Sales) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sales{" +
            "id=" + getId() +
            ", total=" + getTotal() +
            ", serviceCharges=" + getServiceCharges() +
            ", dateOfSale='" + getDateOfSale() + "'" +
            "}";
    }
}
