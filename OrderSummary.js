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

  // Función para imprimir el pedido (100% online)
  const handlePrintOrder = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Pedido Bahia Chill</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 15px;
            max-width: 100%;
            margin: 0 auto;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 2px solid #2c5d73;
            padding-bottom: 10px;
          }
          .header h1 {
            font-size: 22px;
            color: #2c5d73;
            margin: 5px 0;
          }
          .info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
            flex-wrap: wrap;
          }
          .items {
            margin: 15px 0;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px dashed #ddd;
          }
          .item-name {
            font-weight: bold;
          }
          .item-notes {
            font-size: 12px;
            color: #666;
            margin-top: 3px;
          }
          .total {
            font-weight: bold;
            text-align: right;
            margin-top: 15px;
            font-size: 18px;
            border-top: 2px solid #2c5d73;
            padding-top: 10px;
          }
          .footer {
            text-align: center;
            font-size: 11px;
            color: #666;
            margin-top: 20px;
          }
          @media print {
            body {
              padding: 0;
              font-size: 14px;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Bahia Chill</h1>
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
          <h3>Detalle del pedido:</h3>
          ${items.map(item => `
            <div class="item">
              <div>
                <div class="item-name">${item.product.name} x${item.quantity}</div>
                ${item.notes ? `<div class="item-notes">${item.notes}</div>` : ''}
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
            <h3>Datos de facturación:</h3>
            <p><strong>Nombre:</strong> ${invoiceData.name}</p>
            <p><strong>${invoiceData.idType}:</strong> ${invoiceData.idNumber}</p>
            <p><strong>Contacto:</strong> ${invoiceData.contact} (${invoiceData.contactType})</p>
          </div>
        ` : ''}
        
        <div class="footer">
          <p>Sistema de Comanda Bahia Chill</p>
        </div>

        <div class="no-print" style="margin-top: 20px; text-align: center;">
          <button onclick="window.print()" style="padding: 8px 15px; background: #2c5d73; color: white; border: none; border-radius: 4px; margin-right: 10px;">
            Imprimir
          </button>
          <button onclick="window.close()" style="padding: 8px 15px; background: #ccc; color: #333; border: none; border-radius: 4px;">
            Cerrar
          </button>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  // Resto del código...
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
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setEditQuantity(isNaN(value) || value < 1 ? 1 : value);
                        }}
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
                        aria-label="Editar"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-red-400 hover:text-red-600"
                        aria-label="Eliminar"
                      >
                        Eliminar
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
              onClick={handlePrintOrder}
              className="w-full mt-4 bg-[#3d819d] hover:bg-[#2c5d73] text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Imprimir Pedido
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
