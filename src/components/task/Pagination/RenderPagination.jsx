import React from "react";
import {Pagination} from "react-bootstrap";

const RenderPagination = ({currentPage, setCurrentPage, totalPages}) => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
                className="mx-0"
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="pagin d-flex justify-content-center mt-4">
            <Pagination className="mb-0 shadow-sm rounded-pill px-2">
                <Pagination.First
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                />

                {items}

                <Pagination.Next
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
};

export default RenderPagination;
