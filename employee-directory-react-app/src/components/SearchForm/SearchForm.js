import React from "react";

function SearchForm (props) {
    return (
        <form className = "search">
            <div className="mb-3">
                <label htmlFor="employees" for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
        </form>

    );
}

export default SearchForm;