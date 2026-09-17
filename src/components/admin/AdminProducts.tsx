import React, { useState } from 'react';
import { Product, Category } from '../../types';
import { api } from '../../api';
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  Link,
  Check,
  X,
  Eye,
  EyeOff,
  Layers,
  Image as ImageIcon,
  FolderPlus,
  FolderTree,
  AlertTriangle,
} from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  token: string;
  onRefresh: () => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  categories,
  token,
  onRefresh,
}) => {
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Category creation & management states
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryModalError, setCategoryModalError] = useState('');
  const [savingCategory, setSavingCategory] = useState(false);

  // Manage categories panel state
  const [showManageCategories, setShowManageCategories] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [categoryWarning, setCategoryWarning] = useState<string | null>(null);

  const emptyProduct: Partial<Product> = {
    name: '',
    category: categories[0]?.name || 'BEDROOM',
    subcategory: categories[0]?.subcategories[0] || 'Bed',
    description: '',
    priceType: 'quote',
    price: undefined,
    startingPrice: undefined,
    material: '',
    dimensions: '',
    customizationInfo: 'Size, wood aur finishing customized kiya ja sakta hai.',
    images: [],
    videoUrl: '',
    published: true,
  };

  const startNew = () => {
    setEditingProduct({ ...emptyProduct });
    setIsCreating(true);
    setStatusMessage('');
    setErrorMessage('');
  };

  const startEdit = (prod: Product) => {
    setEditingProduct({ ...prod });
    setIsCreating(false);
    setStatusMessage('');
    setErrorMessage('');
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsCreating(false);
    setImageUrlInput('');
  };

  // Image Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await api.uploadMedia(file, token);
      if (res.url) {
        const currentImages = editingProduct?.images || [];
        setEditingProduct({
          ...editingProduct,
          images: [...currentImages, res.url],
        });
      }
    } catch (err: any) {
      alert('Photo upload me samasya: ' + (err.message || 'Error'));
    } finally {
      setUploadingImage(false);
    }
  };

  // Add image URL from text
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    const currentImages = editingProduct?.images || [];
    setEditingProduct({
      ...editingProduct,
      images: [...currentImages, imageUrlInput.trim()],
    });
    setImageUrlInput('');
  };

  // Remove image by index
  const handleRemoveImage = (index: number) => {
    if (!editingProduct?.images) return;
    const updated = [...editingProduct.images];
    updated.splice(index, 1);
    setEditingProduct({ ...editingProduct, images: updated });
  };

  // Save product
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.category) {
      setErrorMessage('Product Name aur Category aawashyak hain.');
      return;
    }

    try {
      if (isCreating) {
        await api.createProduct(editingProduct as any, token);
        setStatusMessage('Naya furniture product safalta-purvak add ho gaya!');
      } else if (editingProduct.id) {
        await api.updateProduct(editingProduct.id, editingProduct, token);
        setStatusMessage('Product details update ho gayi hain!');
      }
      onRefresh();
      cancelEdit();
    } catch (err: any) {
      setErrorMessage(err.message || 'Product save karne mein truti.');
    }
  };

  // Delete product
  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Kya aap sach me "${name}" ko delete karna chahte hain?`)) {
      try {
        await api.deleteProduct(id, token);
        onRefresh();
      } catch (err: any) {
        alert('Delete nahi ho paya: ' + err.message);
      }
    }
  };

  // Category Operations
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setCategoryModalError('Category Name aawashyak hai.');
      return;
    }
    setSavingCategory(true);
    setCategoryModalError('');
    try {
      const created = await api.createCategory({ name: newCategoryName.trim() }, token);
      onRefresh();
      if (editingProduct) {
        setEditingProduct({
          ...editingProduct,
          category: created.name,
        });
      }
      setStatusMessage(`Nayi category "${created.name}" safalta-purvak ban gayi!`);
      setNewCategoryName('');
      setShowNewCategoryModal(false);
    } catch (err: any) {
      setCategoryModalError(err.message || 'Category banane mein truti aayi.');
    } finally {
      setSavingCategory(false);
    }
  };

  const handleEditCategorySave = async (catId: string) => {
    if (!editingCategoryName.trim()) return;
    try {
      await api.editCategory(catId, { name: editingCategoryName.trim() }, token);
      onRefresh();
      setEditingCategoryId(null);
      setEditingCategoryName('');
      setStatusMessage('Category name update ho gaya!');
    } catch (err: any) {
      alert('Category update error: ' + err.message);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    setCategoryWarning(null);
    const assignedProducts = products.filter(
      (p) => p.category.toLowerCase() === category.name.toLowerCase()
    );

    if (assignedProducts.length > 0) {
      setCategoryWarning(
        `This category is being used by ${assignedProducts.length} existing product(s) ("${assignedProducts.map((p) => p.name).slice(0, 2).join('", "')}"${assignedProducts.length > 2 ? ' etc.' : ''}). Please move those products to another category before deleting.`
      );
      return;
    }

    if (
      window.confirm(
        `Kya aap sach mein category "${category.name}" ko delete karna chahte hain?`
      )
    ) {
      try {
        await api.deleteCategory(category.id, token);
        onRefresh();
        setStatusMessage(`Category "${category.name}" delete ho gayi.`);
      } catch (err: any) {
        setCategoryWarning(err.message || 'Category delete nahi ho payi.');
      }
    }
  };

  // Subcategories for selected category in form
  const currentCategoryObj = categories.find(
    (c) => c.name.toLowerCase() === (editingProduct?.category || '').toLowerCase()
  );

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dfd3c4]">
        <div>
          <h3 className="font-serif-craft text-xl font-bold text-[#14281e]">
            Furniture Products Management
          </h3>
          <p className="text-xs text-[#706456]">
            Total {products.length} products listed. Yahan se naya item add karein ya price/photo badlein.
          </p>
        </div>

        {!editingProduct && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="admin-manage-categories-btn"
              onClick={() => {
                setCategoryWarning(null);
                setShowManageCategories(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#f6f1e8] text-[#1c3b2d] border border-[#dfd3c4] text-xs font-semibold shadow-2xs transition-colors"
            >
              <FolderTree className="w-4 h-4 text-[#5c341b]" />
              <span>Manage Categories ({categories.length})</span>
            </button>

            <button
              id="admin-add-product-btn"
              onClick={startNew}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-[#88ba9e]" />
              <span>Naya Furniture Add Karein</span>
            </button>
          </div>
        )}
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-medium">
          {statusMessage}
        </div>
      )}

      {/* Editor Modal / Panel */}
      {editingProduct && (
        <div className="bg-[#fbf9f5] border-2 border-[#1c3b2d]/30 rounded-2xl p-6 shadow-md animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-[#dfd3c4]">
            <h4 className="font-serif-craft text-lg font-bold text-[#14281e]">
              {isCreating ? 'Naya Furniture Product Banayein' : `Edit: ${editingProduct.name}`}
            </h4>
            <button
              onClick={cancelEdit}
              className="p-1.5 rounded-lg text-[#706456] hover:bg-[#ede5d8]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSave} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Royal Saagwan King Size Bed"
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                />
              </div>

              {/* Category */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#422514]">Category *</label>
                  <button
                    type="button"
                    id="admin-add-category-inline-btn"
                    onClick={() => {
                      setNewCategoryName('');
                      setCategoryModalError('');
                      setShowNewCategoryModal(true);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1c3b2d] hover:text-[#14281e] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#88ba9e]" />
                    <span>+ Nayi Category Banayein</span>
                  </button>
                </div>
                <select
                  value={editingProduct.category || ''}
                  onChange={(e) => {
                    const newCat = e.target.value;
                    const foundCat = categories.find((c) => c.name === newCat);
                    setEditingProduct({
                      ...editingProduct,
                      category: newCat,
                      subcategory: foundCat?.subcategories[0] || '',
                    });
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                  {/* Keep custom/other as fallback if not in list */}
                  {!categories.some((c) => c.name.toLowerCase() === 'custom / other') && (
                    <option value="Custom / Other">Custom / Other</option>
                  )}
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">Sub-Category</label>
                <input
                  type="text"
                  value={editingProduct.subcategory || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, subcategory: e.target.value })
                  }
                  placeholder="e.g. Double Bed, Sofa Set, Dining Table, Wardrobe"
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                />
              </div>

              {/* Price Type */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Pricing System (Owner Control)
                </label>
                <select
                  value={editingProduct.priceType || 'quote'}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      priceType: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                >
                  <option value="quote">Get Quote / 'Price ke liye WhatsApp karein'</option>
                  <option value="starting_from">Starting From (₹ ______ se shuru)</option>
                  <option value="fixed">Fixed Price (₹ ______)</option>
                </select>
              </div>

              {/* Price Values based on Type */}
              {editingProduct.priceType === 'fixed' && (
                <div>
                  <label className="block text-xs font-bold text-[#422514] mb-1">
                    Fixed Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="e.g. 28000"
                    className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                  />
                </div>
              )}

              {editingProduct.priceType === 'starting_from' && (
                <div>
                  <label className="block text-xs font-bold text-[#422514] mb-1">
                    Starting Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.startingPrice || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        startingPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="e.g. 22000"
                    className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                  />
                </div>
              )}

              {/* Material */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Wood / Material
                </label>
                <input
                  type="text"
                  value={editingProduct.material || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, material: e.target.value })
                  }
                  placeholder="e.g. Solid Saagwan (Teak Wood) / HDHMR Ply"
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                />
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Size / Dimensions
                </label>
                <input
                  type="text"
                  value={editingProduct.dimensions || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, dimensions: e.target.value })
                  }
                  placeholder="e.g. 6 x 6.5 Feet King Size"
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Product Video URL (Optional)
                </label>
                <input
                  type="text"
                  value={editingProduct.videoUrl || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, videoUrl: e.target.value })
                  }
                  placeholder="e.g. https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#422514] mb-1">Description</label>
              <textarea
                rows={3}
                value={editingProduct.description || ''}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, description: e.target.value })
                }
                placeholder="Product ki detail, banawat aur suvidha batayein..."
                className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
              />
            </div>

            {/* Customization note */}
            <div>
              <label className="block text-xs font-bold text-[#422514] mb-1">
                Customization Jankari
              </label>
              <input
                type="text"
                value={editingProduct.customizationInfo || ''}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, customizationInfo: e.target.value })
                }
                placeholder="e.g. Size, wood aur finishing customized kiya ja sakta hai."
                className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
              />
            </div>

            {/* Images Manager */}
            <div className="pt-2 border-t border-[#dfd3c4] space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#422514]">
                Product Photos
              </label>

              {/* Upload or URL Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-dashed border-[#b8a794] rounded-xl text-xs font-semibold text-[#1c3b2d] hover:bg-[#ede5d8] transition-colors">
                  <Upload className="w-4 h-4 text-[#25503d]" />
                  <span>{uploadingImage ? 'Uploading...' : 'Mobile / Computer Se Upload Karein'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>

                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Ya Image Link (URL) paste karein"
                    className="flex-1 px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-2 bg-[#7b4624] text-white text-xs font-semibold rounded-xl hover:bg-[#5c341b]"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Preview thumbnails */}
              {editingProduct.images && editingProduct.images.length > 0 && (
                <div className="flex gap-3 flex-wrap pt-2">
                  {editingProduct.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#dfd3c4] group"
                    >
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Published Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#14281e]">
                <input
                  type="checkbox"
                  checked={editingProduct.published ?? true}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, published: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#1c3b2d]"
                />
                <span>Public Website Par Dikhayein (Published)</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#dfd3c4]">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs font-semibold text-[#524639]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold rounded-xl shadow-xs"
              >
                Product Save Karein
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List Table */}
      <div className="bg-white rounded-2xl border border-[#dfd3c4] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#4a3f33]">
            <thead className="bg-[#f4efe7] text-[#14281e] font-semibold uppercase tracking-wider border-b border-[#e2d7c9]">
              <tr>
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price Setting</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e8dc]">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#fbf9f5] transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-lg bg-[#ede4d5] overflow-hidden flex items-center justify-center">
                      {prod.images && prod.images[0] ? (
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-[#8c7e6c]" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#14281e]">
                    <div>{prod.name}</div>
                    <div className="text-[10px] text-[#706456] font-normal">{prod.material}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-[#1c3b2d]/10 text-[#14281e] px-2 py-0.5 rounded text-[10px] font-semibold">
                      {prod.category}
                    </span>
                    {prod.subcategory && (
                      <span className="text-[10px] text-[#7b4624] block mt-0.5 font-medium">
                        {prod.subcategory}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {prod.priceType === 'fixed' && prod.price ? (
                      <span className="font-bold text-[#14281e]">
                        Fixed: ₹ {prod.price.toLocaleString('en-IN')}
                      </span>
                    ) : prod.priceType === 'starting_from' && prod.startingPrice ? (
                      <span className="font-semibold text-[#1c3b2d]">
                        From: ₹ {prod.startingPrice.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-[#7b4624] italic">Price on WhatsApp</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {prod.published ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-semibold">
                        <Eye className="w-3 h-3" />
                        <span>Live</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-semibold">
                        <EyeOff className="w-3 h-3" />
                        <span>Hidden</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => startEdit(prod)}
                      className="p-1.5 rounded-lg bg-[#f4efe7] hover:bg-[#ede5d8] text-[#14281e] transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id, prod.name)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Nayi Category Banayein */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-[#fbf9f5] rounded-2xl max-w-md w-full p-6 border border-[#dfd3c4] shadow-xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfd3c4]">
              <h4 className="font-serif-craft text-lg font-bold text-[#14281e] flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-[#1c3b2d]" />
                <span>Nayi Category Banayein</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowNewCategoryModal(false)}
                className="p-1 rounded-md text-[#786c5f] hover:bg-[#ede5d8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {categoryModalError && (
              <div className="mt-3 p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {categoryModalError}
              </div>
            )}

            <form onSubmit={handleCreateCategory} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Kids Furniture, Temple, Bookshelf, Outdoor Furniture..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#dfd3c4]">
                <button
                  type="button"
                  onClick={() => setShowNewCategoryModal(false)}
                  disabled={savingCategory}
                  className="px-4 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs font-semibold text-[#524639] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCategory}
                  id="save-new-category-modal-btn"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold rounded-xl shadow-xs disabled:opacity-60"
                >
                  <Check className="w-4 h-4 text-[#88ba9e]" />
                  <span>{savingCategory ? 'Saving...' : 'Category Save Karein'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Manage Categories Area */}
      {showManageCategories && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-[#fbf9f5] rounded-2xl max-w-2xl w-full p-6 border border-[#dfd3c4] shadow-2xl relative max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfd3c4]">
              <div>
                <h4 className="font-serif-craft text-lg font-bold text-[#14281e] flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-[#1c3b2d]" />
                  <span>Manage Categories</span>
                </h4>
                <p className="text-xs text-[#706456]">
                  Total {categories.length} categories. Nayi category jodein, edit karein ya delete karein.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowManageCategories(false);
                  setCategoryWarning(null);
                }}
                className="p-1 rounded-md text-[#786c5f] hover:bg-[#ede5d8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {categoryWarning && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-300 text-amber-900 text-xs rounded-xl flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium leading-relaxed">{categoryWarning}</div>
                <button
                  type="button"
                  onClick={() => setCategoryWarning(null)}
                  className="text-amber-800 font-bold ml-2 hover:bg-amber-100 p-0.5 rounded"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Quick Add Bar inside Manage Categories */}
            <div className="mt-4 p-3 bg-white border border-[#dfd3c4] rounded-xl flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nayi category ka naam likhein (e.g. Shoe Rack, Office Furniture)..."
                className="flex-1 px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-lg text-xs text-[#26221f] focus:outline-none focus:ring-1 focus:ring-[#1c3b2d]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateCategory(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={savingCategory || !newCategoryName.trim()}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold rounded-lg disabled:opacity-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#88ba9e]" />
                <span>Add Category</span>
              </button>
            </div>

            {/* Categories List */}
            <div className="mt-4 overflow-y-auto flex-1 space-y-2 pr-1">
              {categories.map((cat) => {
                const count = products.filter(
                  (p) => p.category.toLowerCase() === cat.name.toLowerCase()
                ).length;
                const isEditing = editingCategoryId === cat.id;

                return (
                  <div
                    key={cat.id}
                    className="p-3 bg-white rounded-xl border border-[#e6ded3] flex items-center justify-between gap-3 shadow-2xs"
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 text-xs bg-[#fbf9f5] border border-[#1c3b2d] rounded-lg text-[#14281e]"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleEditCategorySave(cat.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleEditCategorySave(cat.id)}
                          className="px-3 py-1.5 bg-[#1c3b2d] text-white text-xs font-semibold rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategoryId(null);
                            setEditingCategoryName('');
                          }}
                          className="px-2.5 py-1.5 bg-gray-100 text-[#5c341b] text-xs rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="w-2 h-2 rounded-full bg-[#1c3b2d]" />
                          <span className="text-xs font-bold text-[#14281e]">{cat.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#f4efe7] text-[#5c341b] text-[10px] font-semibold border border-[#dfd3c4]">
                            {count} product{count === 1 ? '' : 's'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCategoryId(cat.id);
                              setEditingCategoryName(cat.name);
                              setCategoryWarning(null);
                            }}
                            className="p-1.5 text-[#5c341b] hover:bg-[#f4efe7] rounded-lg transition-colors"
                            title="Edit Category Name"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#dfd3c4] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowManageCategories(false);
                  setCategoryWarning(null);
                }}
                className="px-4 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs font-semibold text-[#524639]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
