package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A ReturnsData.
 */
@Entity
@Table(name = "returns_data")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ReturnsData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_of_return")
    private LocalDate dateOfReturn;

    @OneToOne
    @JoinColumn(unique = true)
    private Sales salesCode;

    @OneToMany(mappedBy = "returnCode")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ReturnItems> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateOfReturn() {
        return dateOfReturn;
    }

    public ReturnsData dateOfReturn(LocalDate dateOfReturn) {
        this.dateOfReturn = dateOfReturn;
        return this;
    }

    public void setDateOfReturn(LocalDate dateOfReturn) {
        this.dateOfReturn = dateOfReturn;
    }

    public Sales getSalesCode() {
        return salesCode;
    }

    public ReturnsData salesCode(Sales sales) {
        this.salesCode = sales;
        return this;
    }

    public void setSalesCode(Sales sales) {
        this.salesCode = sales;
    }

    public Set<ReturnItems> getItems() {
        return items;
    }

    public ReturnsData items(Set<ReturnItems> returnItems) {
        this.items = returnItems;
        return this;
    }

    public ReturnsData addItems(ReturnItems returnItems) {
        this.items.add(returnItems);
        returnItems.setReturnCode(this);
        return this;
    }

    public ReturnsData removeItems(ReturnItems returnItems) {
        this.items.remove(returnItems);
        returnItems.setReturnCode(null);
        return this;
    }

    public void setItems(Set<ReturnItems> returnItems) {
        this.items = returnItems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReturnsData)) {
            return false;
        }
        return id != null && id.equals(((ReturnsData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReturnsData{" +
            "id=" + getId() +
            ", dateOfReturn='" + getDateOfReturn() + "'" +
            "}";
    }
}
