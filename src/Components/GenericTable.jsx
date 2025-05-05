import React, { useMemo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const TableWrapper = styled.div`
  .tab {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .tab-cols-head {
    width: 95%;
    margin: auto;
  }

  .tab-cols {
    width: 100%;
    min-width: ${props => props.minWidth || '1075px'};
    margin-top: 10px;
    overflow-x: scroll;
  }

  .odd {
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: ${props => props.gridColumns || '.4fr .8fr 1fr .8fr 1.4fr 1fr 0.8fr'};
    grid-template-rows: 45px;
    border: 1px solid #cbcbcb;
    border-top: none;
    align-items: center;
    font-size: 14px;

    td {
      color: #252E4A;
      padding: 10px 15px;
      font-size: 14px;
      font-weight: 400;
       
      .thumb {
        width: 40px;
        height: auto;
        object-fit: cover;
      }
    }
  }

  .odd1 {
    position: relative;
    top: 4px;
    color: #000000b0;
    background: #ebf3fa;
    font-size: 13px;
    border: 1px solid #cbcbcb;

    td {
      color: #757f91;
      position: relative;
      cursor: pointer;
      overflow-x: auto;
      overflow-y: hidden;

      &::before {
        content: '▲';
        position: absolute;
        top: 17.5%;
        right: 10px;
        font-size: 10px;
        width: 0;
        height: 0;
        opacity: .125;
      }

      &::after {
        content: '▼';
        position: absolute;
        bottom: 55%;
        right: 10px;
        font-size: 10px;
        width: 0;
        height: 0;
        opacity: .125;
      }

      &.new::after {
        opacity: 1;
      }
      &.old::before {
        opacity: 1;
      }
    }
  }

  .odd2 {
    grid-template-columns: 1fr !important;
    place-items: center;

    td {
      font-size: 16px !important;
      color: #757f91;
    }
  }

  .stack-output {
    display: flex;
    align-items: center;

    p {
      padding-left: 10px;
    }

    button {
      margin-right: 15px;
      background: none;
      border: none;
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        font-size: 24px;
      }
    }
  }

  @media (min-width: 1500px) { 
    .odd {
      font-size: 16px;
      justify-content: center;

      td {
        font-size: 16px;
      }
    }
  }
`;

const Pagination = styled.div`
  margin: 15px 0 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.active ? '#3282c4' : 'transparent'};
  color: ${props => props.active ? 'white' : '#3282c4'};
  cursor: pointer;
  margin: 0 5px;
  box-shadow: ${props => props.active ? 'none' : 'rgba(0, 0, 0, 0.2) 0px 0px 1px 1px'};
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GenericTable = ({
  columns,
  data,
  currentPage,
  onPageChange,
  onSort,
  sortConfig,
  minWidth,
  gridColumns,
  pageSize = 10,
  actionButtons = [],
  emptyMessage = "No data available in the table",
  searchEmptyMessage = "No matching records found"
}) => {
  const paginationData = useMemo(() => {
    const pages = Math.ceil(data.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = data.slice(start, end);

    return { pages, paginatedData };
  }, [data, currentPage, pageSize]);

  return (
    <TableWrapper minWidth={minWidth} gridColumns={gridColumns}>
      <div className="tab">
        <table className="tab-cols">
          <thead>
            <tr className="odd odd1">
              <td>#</td>
              {columns.map(column => (
                <td
                  key={column.key}
                  onClick={() => column.sortable && onSort(column.key)}
                  className={sortConfig?.key === column.key ? 
                    (sortConfig?.direction === 'asc' ? 'new' : 'old') : ''}
                >
                  {column.title}
                </td>
              ))}
              {actionButtons.length > 0 && <td>Action</td>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              paginationData.paginatedData.map((item, index) => (
                <tr className="odd" key={item.id || index}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  {columns.map(column => (
                    <td 
                      key={column.key} 
                      className={column.cutText ? 'cut-text' : ''}
                    >
                      {column.render ? column.render(item[column.key], item) : item[column.key] || '-'}
                    </td>
                  ))}
                  {actionButtons.length > 0 && (
                    <td className="stack-output">
                      {actionButtons.map((button, btnIndex) => (
                        <button
                          key={btnIndex}
                          onClick={() => button.onClick(item)}
                          title={button.title}
                        >
                          {button.icon}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="odd odd2">
                <td colSpan={columns.length + (actionButtons.length > 0 ? 2 : 1)} style={{ textAlign: 'center' }}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.length > pageSize && (
        <Pagination>
          <PaginationButton
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </PaginationButton>
          {[...Array(paginationData.pages)].map((_, i) => (
            <PaginationButton
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              active={currentPage === i + 1}
            >
              {i + 1}
            </PaginationButton>
          ))}
          <PaginationButton
            onClick={() => onPageChange(Math.min(currentPage + 1, paginationData.pages))}
            disabled={currentPage === paginationData.pages}
          >
            Next
          </PaginationButton>
        </Pagination>
      )}
    </TableWrapper>
  );
};

export default GenericTable;