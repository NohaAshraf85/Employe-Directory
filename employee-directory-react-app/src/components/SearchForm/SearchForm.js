import React from "react";

function SearchForm (props) {
    return (
        <form className = "search mx-auto">
            <div className="my-4">
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search" />
            </div>
        </form>

    );
}

export default SearchForm;