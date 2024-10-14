import React, { useState } from 'react';
import './MainContent.css'; // Import your custom CSS styles
import { arrayMoveImmutable } from 'array-move';

const DataTable = () => {
    const [data, setData] = useState([
        { id: 1, title: 'Primary', color: '#156BED' },
        { id: 2, title: 'Secondary', color: '#ED1976' },
        { id: 3, title: 'Title Text', color: '#000000' },
        { id: 4, title: 'Supporting Text', color: '#959595' },
    ]);

    const [checkedItems, setCheckedItems] = useState([]);
    const [showItemPopup, setShowItemPopup] = useState(null); // Popup for item-side three dots
    const [showGroupPopup, setShowGroupPopup] = useState(null); // Popup for group-side three dots
    const [showDrawer, setShowDrawer] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [groupedItems, setGroupedItems] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [showAddDrawer, setShowAddDrawer] = useState(false);

    const moveRow = (fromIndex, toIndex) => {
        if (toIndex >= 0 && toIndex < data.length) {
            const updatedData = arrayMoveImmutable(data, fromIndex, toIndex);
            setData(updatedData);
        }
    };

    const handleCheckboxChange = (id) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter(itemId => itemId !== id));
        } else {
            setCheckedItems([...checkedItems, id]);
        }
    };

    const handleItemThreeDotClick = (index) => {
        setShowItemPopup(showItemPopup === index ? null : index); // Toggle item popup
        setShowGroupPopup(null); // Close group popup if open
    };

    const handleGroupThreeDotClick = (groupId) => {
        setShowGroupPopup(showGroupPopup === groupId ? null : groupId); // Toggle group popup
        setShowItemPopup(null); // Close item popup if open
    };

    const handleClosePopup = () => {
        setShowItemPopup(null);
        setShowGroupPopup(null);
    };

    const handleEdit = (index) => {
        setEditingItem(data[index]);
        setIsAdding(false);
        setShowDrawer(true);
        setShowItemPopup(null);
    };

    const handleSave = () => {
        const updatedData = data.map(item =>
            item.id === editingItem.id ? editingItem : item
        );
        setData(updatedData);
        setShowDrawer(false);
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        setShowItemPopup(null);
    };

    const handleDuplicate = (index) => {
        const newItem = { ...data[index], id: data.length + 1, title: `Copy of ${data[index].title}` };
        const updatedData = [...data, newItem];
        setData(updatedData);
        setShowItemPopup(null);
    };

    const handleAddNewItem = () => {
        setEditingItem({ id: data.length + 1, title: '', color: '#000000' });
        setIsAdding(true);
        setShowAddDrawer(true);
    };

    const handleSaveNewItem = () => {
        const updatedData = [...data, editingItem];
        setData(updatedData);
        setShowAddDrawer(false);
        setIsAdding(false);
    };

    const handleGroupItems = () => {
        const groupedData = data.filter(item => checkedItems.includes(item.id));
        const remainingData = data.filter(item => !checkedItems.includes(item.id));

        setData(remainingData);
        setGroupedItems([...groupedItems, { id: groupedItems.length + 1, title: 'New Group', items: groupedData }]);
        setCheckedItems([]);
    };

    const handleSaveGroupName = () => {

        console.log(editingGroup, groupedItems);


        const updatedGroups = groupedItems.map(group =>
            group.id === editingGroup.index ? { ...group, title: editingGroup.title } : group
        );
        setGroupedItems(updatedGroups);
        setShowGroupModal(false);
        setShowGroupPopup(null);
    };




    const handleDuplicateGroup = (groupId) => {
        const groupToDuplicate = groupedItems.find(group => group.id === groupId);
        const duplicatedGroup = {
            ...groupToDuplicate,
            id: groupedItems.length + 1,
            title: `${groupToDuplicate.title} Copy`,
        };
        setGroupedItems([...groupedItems, duplicatedGroup]);
        setShowGroupPopup(null);
    };

    const handleDeleteGroup = (groupId) => {
        const groupToDelete = groupedItems.find(group => group.id === groupId);
        const updatedGroups = groupedItems.filter(group => group.id !== groupId);
        setGroupedItems(updatedGroups);
        setData([...data, ...groupToDelete.items]);
        setShowGroupPopup(null);
    };

    return (
        <div >
            <div className="color-table-container">
                <table className="color-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="color-table-row">
                                <td>
                                    <div className="table-cell">
                                        <button
                                            className="move-button"
                                            onClick={() => moveRow(index, index - 1)}
                                        >
                                            ⬆
                                        </button>
                                        <button
                                            className="move-button"
                                            onClick={() => moveRow(index, index + 1)}
                                        >
                                            ⬇
                                        </button>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                            className="cell-checkbox"
                                        />
                                        {item.title}
                                    </div>
                                </td>
                                <td>
                                    <div className="table-cell">
                                        <input type="color" value={item.color} />
                                        <input type="text" value={item.color} />
                                        {/* {item.color} */}
                                    </div>
                                </td>
                                <td>
                                    <div className="table-cell">
                                        <button
                                            className="three-dot-button-main"
                                            onClick={() => handleItemThreeDotClick(index)}
                                        >
                                            &#8285;
                                        </button>
                                        {showItemPopup === index && (
                                            <div className="popup-menu">
                                                <div className="popup-option" onClick={() => handleEdit(index)}>Edit</div>
                                                <div className="popup-option" onClick={() => handleDuplicate(index)}>Duplicate</div>
                                                <div className="popup-option" onClick={() => handleDelete(index)}>Delete</div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {/* Drawer for editing items */}
                <div className={`drawer right ${showDrawer ? 'open' : ''}`}>
                    <div className="drawer-content">
                        <input
                            type="text"
                            value={editingItem?.title || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value, id: editingItem.length + 1 })}
                        />
                        <div>
                            <input
                                type="color"
                                value={editingItem?.color || '#000000'}
                                onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                            />
                            <input type="text" value={editingItem?.color || '#000000'} />
                        </div>
                        <div className="drawer-actions">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setShowDrawer(false)}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>



            {/* Drawer for adding new items */}
            <div className={`drawer right ${showAddDrawer ? 'open' : ''}`}>
                <div className="drawer-content">
                    <input
                        type="text"
                        placeholder="Item name"
                        value={editingItem?.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    />
                    <input
                        type="color"
                        value={editingItem?.color || '#000000'}
                        onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                    />
                    <div className="drawer-actions">
                        <button onClick={handleSaveNewItem}>Add Item</button>
                        <button onClick={() => setShowAddDrawer(false)}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* Grouped Items */}
            {groupedItems.length > 0 && (
                <div className="group-container">
                    {groupedItems.map((group) => (
                        <div key={group.id} className="group">
                            <div className="group-title">
                                <span>{group.title}</span>
                                <button
                                    className="three-dot-button"
                                    onClick={() => handleGroupThreeDotClick(group.id)}
                                >
                                    &#8285;
                                </button>
                                {showGroupPopup === group.id && (
                                    <div className="popup-menu">
                                        <div className="popup-option" onClick={() => setShowGroupModal(true)}>Edit</div>
                                        <div className="popup-option" onClick={() => handleDuplicateGroup(group.id)}>Duplicate</div>
                                        <div className="popup-option" onClick={() => handleDeleteGroup(group.id)}>Delete</div>
                                    </div>
                                )}
                            </div>
                            <table className="group-table">
                                <thead>
                                    <tr>
                                        <th className="group-table-cell">Name</th>
                                        <th className="group-table-cell">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.items.map(item => (
                                        <tr key={item.id}>
                                            <td className="group-table-cell">
                                                <span>{item.title}</span>
                                            </td>
                                            <td className="group-table-cell">
                                                <div>
                                                    <input type="color" value={item.color} readOnly />
                                                    <input type="text" value={item.color} readOnly className="color-input" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}


            {/* Modal for editing group name */}
            {showGroupModal && (
                <div className="modal">
                    <div className="modal-content">
                        <input
                            type="text"
                            value={editingGroup?.title || ''}
                            onChange={(e) => setEditingGroup({ ...editingGroup, title: e.target.value })}
                        />
                        <div className="modal-actions">
                            <button onClick={handleSaveGroupName}>Save</button>
                            <button onClick={() => setShowGroupModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom popup when items are checked */}
            {checkedItems.length > 0 && (
                <div className="bottom-popup">
                    <span>{checkedItems.length} items selected</span>
                    <button onClick={handleGroupItems}>Group</button>
                </div>
            )}

            <button className='add-new-item' onClick={handleAddNewItem}>+ Add color</button>
        </div>
    );
};

export default DataTable;
