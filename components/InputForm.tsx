import React, { ChangeEvent } from 'react';
import { UserInput } from '../types';

interface InputFormProps {
  input: UserInput;
  onChange: (field: keyof UserInput, value: any) => void;
  onSubmit: () => void;
  isFormValid: boolean;
}

const FileInput: React.FC<{
  label: string;
  file: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}> = ({ label, file, onChange, id }) => (
  <div className="flex flex-col gap-2 w-full">
    <label htmlFor={id} className="text-mystic-gold font-serif text-sm tracking-widest uppercase">
      {label}
    </label>
    <div className="relative group cursor-pointer">
      <div className={`
        h-48 w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300
        ${file ? 'border-mystic-accent bg-mystic-800/50' : 'border-slate-600 hover:border-mystic-gold bg-black/20 hover:bg-black/40'}
      `}>
        {file ? (
          <>
            <img 
              src={URL.createObjectURL(file)} 
              alt="Preview" 
              className="h-full w-full object-cover rounded-xl opacity-60" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="bg-black/70 px-3 py-1 rounded text-xs text-white">Image Selected</span>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-slate-400 group-hover:text-mystic-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-slate-400 text-sm">Upload or Take Photo</p>
          </div>
        )}
      </div>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  </div>
);

export const InputForm: React.FC<InputFormProps> = ({ input, onChange, onSubmit, isFormValid }) => {
  return (
    <div className="w-full max-w-4xl mx-auto glass-panel p-8 rounded-2xl shadow-2xl animate-fade-in-up">
      <h2 className="text-3xl font-serif text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-mystic-gold to-orange-300">
        Enter Your Details
      </h2>
      
      <div className="space-y-8">
        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <label htmlFor="dob" className="text-mystic-gold font-serif text-sm tracking-widest uppercase">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            value={input.dob}
            onChange={(e) => onChange('dob', e.target.value)}
            className="w-full bg-black/30 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mystic-gold focus:ring-1 focus:ring-mystic-gold transition-all"
          />
        </div>

        {/* Hand Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileInput
            id="leftHand"
            label="Left Hand (Potential)"
            file={input.leftHand}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onChange('leftHand', e.target.files[0]);
              }
            }}
          />
          <FileInput
            id="rightHand"
            label="Right Hand (Current)"
            file={input.rightHand}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onChange('rightHand', e.target.files[0]);
              }
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6 flex justify-center">
          <button
            onClick={onSubmit}
            disabled={!isFormValid}
            className={`
              relative px-12 py-4 rounded-full font-serif font-bold text-lg tracking-wider overflow-hidden transition-all duration-300
              ${isFormValid 
                ? 'bg-gradient-to-r from-mystic-accent to-purple-600 text-white shadow-[0_0_20px_rgba(157,80,187,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(157,80,187,0.7)]' 
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'}
            `}
          >
            {isFormValid && <span className="absolute inset-0 bg-white/20 animate-pulse-slow"></span>}
            <span className="relative z-10">Reveal My Destiny</span>
          </button>
        </div>
      </div>
    </div>
  );
};