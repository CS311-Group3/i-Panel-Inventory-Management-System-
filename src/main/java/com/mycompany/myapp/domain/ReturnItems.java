package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ReturnItems.
 */
@Entity
@Table(name = "return_items")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ReturnItems implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JsonIgnoreProperties(value = "returnItems", allowSetters = true)
    private Inventory itemCode;

    @ManyToOne
    @JsonIgnoreProperties(value = "items", allowSetters = true)
    private ReturnsData returnCode;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public ReturnItems quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Inventory getItemCode() {
        return itemCode;
    }

    public ReturnItems itemCode(Inventory inventory) {
        this.itemCode = inventory;
        return this;
    }

    public void setItemCode(Inventory inventory) {
        this.itemCode = inventory;
    }

    public ReturnsData getReturnCode() {
        return returnCode;
    }

    public ReturnItems returnCode(ReturnsData returnsData) {
        this.returnCode = returnsData;
        return this;
    }

    public void setReturnCode(ReturnsData returnsData) {
        this.returnCode = returnsData;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReturnItems)) {
            return false;
        }
        return id != null && id.equals(((ReturnItems) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReturnItems{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
