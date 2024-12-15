import React from "react";

import "./Edititem.css";
import { Button } from "antd";

export const EditItem = () => {
  return (
    <div className="edit-container">
      <div className="edit">
        <form>
          <div className="form-edit">
            <label htmlFor="date">Date-time</label>
            <input name="date" />
          </div>
          <div className="form-edit">
            <label htmlFor="type">Type</label>
            <select name="type">
              <option value="income">รายรับ</option>
              <option value="expense">รายจ่าย</option>
            </select>
          </div>
          <div className="form-edit">
            <label htmlFor="amount">Amount</label>
            <input name="amount" />
          </div>
          <div className="form-edit">
            <label htmlFor="note">Note</label>
            <textarea name="note"></textarea>
          </div>
          <Button type="submit" className="btn">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
