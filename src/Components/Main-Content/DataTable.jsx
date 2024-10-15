import React, { useState } from 'react';
import './MainContent.css'; 
import { arrayMoveImmutable } from 'array-move';

const DataTable = () => {
    const [data, setData] = useState([
        { id: 1, title: 'Primary', color: '#156BED' },
        { id: 2, title: 'Secondary', color: '#ED1976' },
        { id: 3, title: 'Title Text', color: '#000000' },
        { id: 4, title: 'Supporting Text', color: '#959595' },
    ]);

    const [checkedItems, setCheckedItems] = useState([]);
    const [showItemPopup, setShowItemPopup] = useState(null);
    const [showGroupPopup, setShowGroupPopup] = useState(null); 
    const [showDrawer, setShowDrawer] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [addingItem, setAddingItem] = useState(null);
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
        setShowItemPopup(showItemPopup === index ? null : index); 
        setShowGroupPopup(null); 
    };

    const handleGroupThreeDotClick = (groupId) => {
        setShowGroupPopup(showGroupPopup === groupId ? null : groupId);
        setShowItemPopup(null); 
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
        setAddingItem({ id: data.length + 1, title: '', color: '#000000' });
        setIsAdding(true);
        setShowAddDrawer(true);
    };

    const handleSaveNewItem = () => {
        const updatedData = [...data, addingItem];
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
        const updatedGroups = groupedItems.map(group =>
            group.id === editingGroup.id ? { ...group, title: editingGroup.title } : group
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
        <div>
            <div className="kzui-color-table-container">
                <table className="kzui-color-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="kzui-color-table-row">
                                <td>
                                    <div className="kzui-table-cell">
                                        <button
                                            className="kzui-move-button"
                                            onClick={() => moveRow(index, index - 1)}
                                        >
                                            ⬆
                                        </button>
                                        <button
                                            className="kzui-move-button"
                                            onClick={() => moveRow(index, index + 1)}
                                        >
                                            ⬇
                                        </button>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                            className="kzui-cell-checkbox"
                                        />
                                        {item.title}
                                    </div>
                                </td>
                                <td>
                                    <div className="kzui-table-cell">
                                        <input type="color" value={item.color} />
                                        <input type="text" value={item.color} />
                                    </div>
                                </td>
                                <td>
                                    <div className="kzui-table-cell">
                                        <button
                                            className="kzui-three-dot-button-main"
                                            onClick={() => handleItemThreeDotClick(index)}
                                        >
                                            &#8285;
                                        </button>
                                        {showItemPopup === index && (
                                            <div className="kzui-popup-menu">
                                                <div className="kzui-popup-option" onClick={() => handleEdit(index)}>Edit</div>
                                                <div className="kzui-popup-option" onClick={() => handleDuplicate(index)}>Duplicate</div>
                                                <div className="kzui-popup-option" onClick={() => handleDelete(index)}>Delete</div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className='kzui-add-new-item' onClick={handleAddNewItem}>+ Add color</button>


                {/* Drawer for editing items */}
                <div className={`kzui-drawer right ${showDrawer ? 'kzui-open' : ''}`}>
                    <div className="kzui-drawer-content">
                        <div className='kzui-name-input'>
                            <label>Name</label>
                            <input
                                type="text"
                                value={editingItem?.title || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                            />
                        </div>
                        <label>Color</label>
                        <div className="kzui-drawer-color-input">
                            <input
                                type="color"
                                value={editingItem?.color || '#000000'}
                                onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editingItem?.color || '#000000'}
                                onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                            />
                        </div>
                        <div className="kzui-drawer-actions">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setShowDrawer(false)}>Cancel</button>
                        </div>
                    </div>
                </div>


                {/* Drawer for adding new items */}
                <div className={`kzui-drawer right ${showAddDrawer ? 'kzui-open' : ''}`}>
                    <div className="kzui-drawer-content">
                        <div className='kzui-name-input'>
                            <label>Name</label>
                            <input
                                type="text"
                                name='title'
                                placeholder="Item name"
                                value={addingItem?.title || ''}
                                onChange={(e) => setAddingItem({ ...addingItem, title: e.target.value })}
                            />
                        </div>
                            <label>Color</label>
                        <div className='kzui-drawer-color-input'>
                            <input
                                name='color'
                                type="color"
                                value={addingItem?.color || '#000000'}
                                onChange={(e) => setAddingItem({ ...addingItem, color: e.target.value })}
                            />
                            <input
                                type="text"
                                name='color'
                                placeholder="Item color"
                                value={addingItem?.color || '#000000'}
                                onChange={(e) => setAddingItem({ ...addingItem, color: e.target.value })}
                            />
                        </div>
                        <div className="kzui-drawer-actions">
                            <button onClick={handleSaveNewItem}>Add</button>
                            <button onClick={() => setShowAddDrawer(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="kzui-groups">
                {groupedItems.map((group) => (
                    <div key={group.id} className="kzui-group">
                        <div className="kzui-group-header">
                            <h3>{group.title}</h3>
                            <button
                                className="kzui-three-dot-button-main"
                                onClick={() => handleGroupThreeDotClick(group.id)}
                            >
                                &#8285;
                            </button>
                            {showGroupPopup === group.id && (
                                <div className="kzui-popup-menu">
                                    <div className="kzui-popup-option" onClick={() => setEditingGroup(group) || setShowGroupModal(true)}>Edit</div>
                                    <div className="kzui-popup-option" onClick={() => handleDuplicateGroup(group.id)}>Duplicate</div>
                                    <div className="kzui-popup-option" onClick={() => handleDeleteGroup(group.id)}>Delete</div>
                                </div>
                            )}
                        </div>
                        <div className="kzui-group-items">

                            <table className="kzui-group-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    {group.items.map(item => (
                                        <tr key={item.id}>
                                            <td className="kzui-group-table-cell">
                                                <span>{item.title}</span>
                                            </td>
                                            <td>
                                                <div  className="kzui-group-table-cell">
                                                    <input type="color" value={item.color} readOnly />
                                                    <input type="text" value={item.color} readOnly/>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>


            {/* Modal for editing group name */}
            {showGroupModal && (
                <div className="kzui-modal">
                    <div className="kzui-modal-content">
                        <h2>Rename Group</h2>
                        <input
                            type="text"
                            value={editingGroup?.title || ''}
                            onChange={(e) => setEditingGroup({ ...editingGroup, title: e.target.value })}
                        />
                        <div className="kzui-modal-actions">
                            <button onClick={handleSaveGroupName}>Save</button>
                            <button onClick={() => setShowGroupModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Bottom popup when items are checked */}
            {checkedItems.length > 0 && (
                <div className="kzui-bottom-popup">
                    <span>{checkedItems.length} items selected</span>
                    <button onClick={handleGroupItems}>Group</button>
                </div>
            )}

        </div>
    );
};

export default DataTable;
