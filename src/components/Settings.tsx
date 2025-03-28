import React, { useState } from "react";
import { X, Plus, Save, Trash2, Edit3, Check, RefreshCw } from "lucide-react";

interface FormField {
   id: string;
   label: string;
   value: string;
   type: "text" | "email" | "tel" | "textarea" | "password" | "number" | "url";
}

interface SettingsProps {
   isOpen: boolean;
   onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
   const [formFields, setFormFields] = useState<FormField[]>(() => {
      const savedFields = localStorage.getItem("customFormFields");
      return savedFields
         ? JSON.parse(savedFields)
         : [
              { id: "name", label: "Full Name", value: "John Doe", type: "text" },
              { id: "email", label: "Email Address", value: "john@example.com", type: "email" },
              { id: "phone", label: "Phone Number", value: "123-456-7890", type: "tel" },
              { id: "address", label: "Address", value: "123 Main St, City, Country", type: "textarea" },
           ];
   });

   const [newField, setNewField] = useState<Omit<FormField, "id">>({
      label: "",
      value: "",
      type: "text",
   });

   const [editingId, setEditingId] = useState<string | null>(null);

   const handleSave = () => {
      localStorage.setItem("customFormFields", JSON.stringify(formFields));
   };

   const addField = () => {
      if (newField.label && newField.value) {
         const id = newField.label.toLowerCase().replace(/\s+/g, "_");
         setFormFields([...formFields, { ...newField, id }]);
         setNewField({ label: "", value: "", type: "text" });
      }
   };

   const removeField = (id: string) => {
      setFormFields(formFields.filter((field) => field.id !== id));
   };

   const updateField = (id: string, updates: Partial<FormField>) => {
      setFormFields(formFields.map((field) => (field.id === id ? { ...field, ...updates } : field)));
   };

   const resetToDefaults = () => {
      const defaultFields = [
         { id: "name", label: "Full Name", value: "John Doe", type: "text" as const },
         { id: "email", label: "Email Address", value: "john@example.com", type: "email" as const },
         { id: "phone", label: "Phone Number", value: "123-456-7890", type: "tel" as const },
         { id: "address", label: "Address", value: "123 Main St, City, Country", type: "textarea" as const },
      ];
      setFormFields(defaultFields);
   };

   if (!isOpen) return null;

   return (
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
         <div className='bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden'>
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
               <h2 className='text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text'>
                  Settings
               </h2>
               <div className='flex items-center gap-2'>
                  <button
                     onClick={resetToDefaults}
                     className='p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors'
                     title='Reset to defaults'>
                     <RefreshCw className='w-5 h-5' />
                  </button>
                  <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors'>
                     <X className='w-6 h-6' />
                  </button>
               </div>
            </div>

            <div className='p-6 overflow-y-auto max-h-[calc(90vh-8rem)]'>
               <div className='mb-8'>
                  <div className='flex items-center justify-between mb-4'>
                     <h3 className='text-lg font-semibold text-gray-800'>Form Autofill Fields</h3>
                     <span className='text-sm text-gray-500'>{formFields.length} fields configured</span>
                  </div>
                  <div className='space-y-4'>
                     {formFields.map((field) => (
                        <div
                           key={field.id}
                           className='flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors'>
                           <div className='flex-grow space-y-4'>
                              {editingId === field.id ? (
                                 <>
                                    <div>
                                       <label className='block text-sm font-medium text-gray-700'>Field Label</label>
                                       <input
                                          type='text'
                                          value={field.label}
                                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                                          className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                                       />
                                    </div>
                                    <div>
                                       <label className='block text-sm font-medium text-gray-700'>Default Value</label>
                                       {field.type === "textarea" ? (
                                          <textarea
                                             value={field.value}
                                             onChange={(e) => updateField(field.id, { value: e.target.value })}
                                             className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                                             rows={3}
                                          />
                                       ) : (
                                          <input
                                             type={field.type}
                                             value={field.value}
                                             onChange={(e) => updateField(field.id, { value: e.target.value })}
                                             className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                                          />
                                       )}
                                    </div>
                                    <div>
                                       <label className='block text-sm font-medium text-gray-700'>Field Type</label>
                                       <select
                                          value={field.type}
                                          onChange={(e) => updateField(field.id, { type: e.target.value as FormField["type"] })}
                                          className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'>
                                          <option value='text'>Text</option>
                                          <option value='email'>Email</option>
                                          <option value='tel'>Phone</option>
                                          <option value='textarea'>Textarea</option>
                                          <option value='password'>Password</option>
                                          <option value='number'>Number</option>
                                          <option value='url'>URL</option>
                                       </select>
                                    </div>
                                 </>
                              ) : (
                                 <div className='flex items-center justify-between'>
                                    <div>
                                       <h4 className='font-medium text-gray-900'>{field.label}</h4>
                                       <p className='text-sm text-gray-500'>Type: {field.type}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                       <button
                                          onClick={() => setEditingId(field.id)}
                                          className='p-2 hover:bg-blue-100 rounded-full text-blue-600 transition-colors'>
                                          <Edit3 className='w-4 h-4' />
                                       </button>
                                       <button
                                          onClick={() => removeField(field.id)}
                                          className='p-2 hover:bg-red-100 rounded-full text-red-600 transition-colors'>
                                          <Trash2 className='w-4 h-4' />
                                       </button>
                                    </div>
                                 </div>
                              )}
                           </div>
                           {editingId === field.id && (
                              <button onClick={() => setEditingId(null)} className='p-2 hover:bg-green-100 rounded-full text-green-600'>
                                 <Check className='w-5 h-5' />
                              </button>
                           )}
                        </div>
                     ))}
                  </div>
               </div>

               <div className='border-t pt-6'>
                  <h3 className='text-lg font-semibold mb-4 text-gray-800'>Add New Field</h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                     <input
                        type='text'
                        placeholder='Field Label'
                        value={newField.label}
                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                        className='rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                     />
                     <input
                        type='text'
                        placeholder='Default Value'
                        value={newField.value}
                        onChange={(e) => setNewField({ ...newField, value: e.target.value })}
                        className='rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                     />
                     <select
                        value={newField.type}
                        onChange={(e) => setNewField({ ...newField, type: e.target.value as FormField["type"] })}
                        className='rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'>
                        <option value='text'>Text</option>
                        <option value='email'>Email</option>
                        <option value='tel'>Phone</option>
                        <option value='textarea'>Textarea</option>
                        <option value='password'>Password</option>
                        <option value='number'>Number</option>
                        <option value='url'>URL</option>
                     </select>
                  </div>
                  <button
                     onClick={addField}
                     className='mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                     <Plus className='w-5 h-5' />
                     Add Field
                  </button>
               </div>
            </div>

            <div className='sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end'>
               <button
                  onClick={() => {
                     handleSave();
                     onClose();
                  }}
                  className='inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
                  <Save className='w-5 h-5' />
                  Save Changes
               </button>
            </div>
         </div>
      </div>
   );
};

export default Settings;
