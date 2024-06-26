import useFilter from '../hooks/useFilter'
import useSort from '../hooks/useSort'
import { useEffect, useState } from 'react';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  textAlign: 'left',
};

const thStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  cursor: 'pointer',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

const trStyle = (index) => ({
  backgroundColor: index % 2 ? '#f2f2f2' : 'white',
});

const inputStyle = {
  marginBottom: '10px',
  padding: '5px',
  fontSize: '16px',
  width: '98%',
};

function DataTable() {
  const userData = [
    { id: '2', name: 'Jane Doe', age: 25, email: 'jane@example.com' },
    { id: '1', name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: '3', name: 'Bob Smith', age: 35, email: 'bob@example.com' },
  ];
  const {filteredData, filterText, handleFilterChange} = useFilter(userData);
  const {sortData, sortedDataByKey} = useSort(userData);
  const [data, setData] = useState(userData)

  useEffect(() => {
    setData(filteredData)
  },[filteredData])

  useEffect(() => {
    setData(sortData)
  },[sortData])

  return (
    <div>
      <input 
        style={inputStyle} 
        type="text" 
        placeholder="Filter" 
        value={filterText}
        onChange={handleFilterChange}
      />
      <table style={tableStyle}>
        <thead>
          <tr key={111}>
            {Object.keys(userData[0]).map((key) => (
              <th style={thStyle} key={key} >
                {key}
                {
                  (key === 'id' || key === 'age') && 
                  <>
                    <span onClick={() => sortedDataByKey(key, 'asc')}>⬆</span>
                    <span onClick={() => sortedDataByKey(key, 'desc')}>⬇</span>
                  </>
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map((item, index) => (
            <tr style={trStyle(index)} key={item.id}>
              {Object.values(item).map((val, idx) => (
                <td style={tdStyle} key={idx}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default DataTable