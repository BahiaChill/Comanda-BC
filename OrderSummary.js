import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';

const OrderSummary = ({ items, selectedTable, username, onUpdateItem, onRemoveItem, onClearOrder }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [editNotes, setEditNotes] = useState('');
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    name: '',
    idType: 'CC',
    idNumber: '',
    contact: '',
    contactType: 'Teléfono'
  });

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditQuantity(items[index].quantity);
    setEditNotes(items[index].notes || '');
  };

  const handleSaveEdit = (index) => {
    if (editQuantity > 0) {
      onUpdateItem(index, editQuantity, editNotes);
      setEditingIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleSaveAsPDF = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Pedido Bahia Chill</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 15px;
            max-width: 300px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 15px;
          }
          .header h1 {
            font-size: 22px;
            color: #2c5d73;
            margin: 5px 0;
          }
          .subheader {
            font-size: 12px;
            color: #666;
          }
          .info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .items {
            border-top: 1px solid #eee;
            padding-top: 10px;
            margin-bottom: 15px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .item-name {
            font-weight: 500;
          }
          .item-quantity {
            font-size: 12px;
            color: #666;
          }
          .notes {
            font-size: 12px;
            color: #666;
            margin-top: 2px;
          }
          .total {
            font-weight: bold;
            text-align: right;
            margin-top: 10px;
            font-size: 18px;
            border-top: 2px solid #2c5d73;
            padding-top: 5px;
          }
          .footer {
            text-align: center;
            font-size: 11px;
            color: #666;
            margin-top: 20px;
          }
          .invoice-info {
            border-top: 1px dashed #ccc;
            padding-top: 10px;
            margin-bottom: 15px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Bahia Chill</h1>
          <p class="subheader">Recuerda subir este archivo al almacenamiento correspondiente</p>
          <div class="info">
            <span><strong>Mesa:</strong> ${selectedTable}</span>
            <span><strong>Atendido por:</strong> ${username}</span>
          </div>
          <div class="info">
            <span><strong>Fecha:</strong> ${currentDate}</span>
            <span><strong>Hora:</strong> ${currentTime}</span>
          </div>
        </div>
        
        <div class="items">
          ${items.map(item => `
            <div class="item">
              <div>
                <span class="item-name">${item.product.name}</span>
                <span class="item-quantity">x${item.quantity}</span>
                ${item.notes ? `<div class="notes">(${item.notes})</div>` : ''}
              </div>
              <div>$${(item.product.price * item.quantity).toLocaleString()}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="total">
          Total: $${total.toLocaleString()}
        </div>
        
        ${invoiceData.name ? `
          <div class="invoice-info">
            <p style="font-weight: bold; font-size: 14px;">Datos de Facturación:</p>
            <p style="font-size: 13px;"><strong>Nombre:</strong> ${invoiceData.name}</p>
            <p style="font-size: 13px;"><strong>${invoiceData.idType}:</strong> ${invoiceData.idNumber}</p>
            <p style="font-size: 13px;"><strong>${invoiceData.contactType}:</strong> ${invoiceData.contact}</p>
          </div>
        ` : ''}
        
        <div class="footer">
          <p>Sistema de Comanda para Bahia Chill ®</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([printContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pedido_M${selectedTable}_${currentDate.replace(/\//g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Resumen del Pedido</h3>
        {items.length > 0 && (
          <button
            onClick={onClearOrder}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay items en el pedido</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              {editingIndex === index ? (
                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">{item.product.name}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(index)}
                        className="text-green-500 hover:text-green-700 text-sm"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-4 mb-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Cantidad</label>
                      <input
                        type="number"
                        min="1"
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <label className="block text-xs text-gray-500 mb-1">Notas</label>
                      <input
                        type="text"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Notas especiales"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x ${item.product.price.toLocaleString()} 
                      {item.notes && ` (${item.notes})`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-medium mr-3">${(item.product.price * item.quantity).toLocaleString()}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-400 hover:text-blue-600"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          
          <div className="pt-2 mt-4 border-t border-gray-200">
            <p className="text-right font-bold text-lg">
              Total: <span className="text-[#3d819d]">${total.toLocaleString()}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 text-sm text-gray-600 border-t border-gray-200">
            <div>
              <p className="font-medium">Mesa</p>
              <p>{selectedTable || 'No seleccionada'}</p>
            </div>
            <div>
              <p className="font-medium">Fecha</p>
              <p>{currentDate}</p>
            </div>
            <div>
              <p className="font-medium">Hora</p>
              <p>{currentTime}</p>
            </div>
          </div>

          <button
            onClick={() => setShowInvoiceForm(!showInvoiceForm)}
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {showInvoiceForm ? 'Ocultar Factura' : 'Datos de Factura'}
          </button>

          {showInvoiceForm && (
            <InvoiceForm 
              invoiceData={invoiceData} 
              setInvoiceData={setInvoiceData} 
              onClose={() => setShowInvoiceForm(false)}
            />
          )}

          {items.length > 0 && (
            <button
              onClick={handleSaveAsPDF}
              className="w-full mt-4 bg-[#3d819d] hover:bg-[#2c5d73] text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Guardar Pedido (PDF)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;

// DONE