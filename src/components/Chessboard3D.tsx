'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'


// Dynamic Camera Controller
function CameraController({ 
  position, 
  fov, 
  lookAt = [0, 0, 0] 
}: { 
  position: [number, number, number], 
  fov: number,
  lookAt?: [number, number, number]
}) {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.position.set(...position)
    // Only set fov if it's a PerspectiveCamera
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov
    }
    camera.lookAt(new THREE.Vector3(...lookAt))
    camera.updateProjectionMatrix()
  })
  
  return null
}

// Chessboard component with dynamic positioning
function ChessboardBase({ position, rotation, scale }: {
  position: [number, number, number],
  rotation: [number, number, number],
  scale: number
}) {
  const boardRef = useRef<THREE.Group>(null)
  
  // Create 8x8 chessboard with luxury colors
  const squares = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isLight = (row + col) % 2 === 0
      
      // Main square
      squares.push(
        <Box
          key={`${row}-${col}`}
          args={[2, 0.12, 2]}
          position={[col * 2 - 7, 0, row * 2]}
        >
          <meshStandardMaterial 
            color={isLight ? '#f8f5f0' : '#193A86'} // Cream and Chess Blue
            roughness={0.6}
            metalness={0.05}
          />
        </Box>
      )
      
      // Beveled edge effect - top rim
      squares.push(
        <Box
          key={`${row}-${col}-bevel`}
          args={[2.05, 0.04, 2.05]}
          position={[col * 2 - 7, 0.08, row * 2]}
        >
          <meshStandardMaterial 
            color={isLight ? '#ffffff' : '#1a3a8a'} // Brighter versions
            roughness={0.4}
            metalness={0.1}
          />
        </Box>
      )
      
      // Subtle inner shadow effect
      squares.push(
        <Box
          key={`${row}-${col}-shadow`}
          args={[1.8, 0.02, 1.8]}
          position={[col * 2 - 7, 0.01, row * 2]}
        >
          <meshStandardMaterial 
            color={isLight ? '#f0ebe3' : '#152e6b'} // Slightly darker
            roughness={0.8}
            metalness={0.02}
          />
        </Box>
      )
    }
  }

  return (
    <group 
      ref={boardRef} 
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      {squares}
      
      {/* Decorative board border with Chess Red accent */}
      <Box args={[16.6, 0.25, 16.6]} position={[0, -0.125, 7]}>
        <meshStandardMaterial 
          color="#EC4957" 
          roughness={0.3}
          metalness={0.2}
        />
      </Box>
      
      {/* Inner border trim */}
      <Box args={[16.2, 0.2, 16.2]} position={[0, -0.1, 7]}>
        <meshStandardMaterial 
          color="#d63d4a" 
          roughness={0.4}
          metalness={0.1}
        />
      </Box>
      
      {/* Luxury board base with gradient effect */}
      <Box args={[17.2, 0.6, 17.2]} position={[0, -0.5, 7]}>
        <meshStandardMaterial 
          color="#193A86" 
          roughness={0.5}
          metalness={0.3}
        />
      </Box>
      
      {/* Deep base foundation */}
      <Box args={[17.6, 0.8, 17.6]} position={[0, -0.9, 7]}>
        <meshStandardMaterial 
          color="#0f2147" 
          roughness={0.8}
          metalness={0.1}
        />
      </Box>
      
      {/* Corner accent details */}
      {[-8, 8].map(x => 
        [-1, 15].map(z => (
          <Box 
            key={`corner-${x}-${z}`}
            args={[0.3, 0.4, 0.3]} 
            position={[x, -0.3, z]}
          >
            <meshStandardMaterial 
              color="#EC4957" 
              roughness={0.2}
              metalness={0.4}
              emissive="#EC4957"
              emissiveIntensity={0.1}
            />
          </Box>
        ))
      )}
    </group>
  )
}

// Main 3D Chessboard component
export default function Chessboard3D() {
  // Fixed board settings (user's preferred position)
  const boardPosition: [number, number, number] = [0, -4.6, 5.8]
  const boardRotation: [number, number, number] = [-Math.PI/3, 0, 0] // -60 degrees
  const boardScale = 0.7

  // Fixed settings (locked)
  const cameraPosition: [number, number, number] = [0, 8, 12]
  const cameraFOV = 90

  // Animation state
  const [isLoaded, setIsLoaded] = useState(false)

  // Start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100) // Small delay to ensure smooth animation start

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <motion.div 
        className="fixed bottom-0 left-0 w-full h-full z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full h-full bg-gradient-to-t from-gray-100/10 to-transparent">
          <Canvas
            className="w-full h-full"
            shadows
            gl={{ antialias: true, alpha: true }}
          >
            {/* Dynamic Camera Controller */}
            <CameraController 
              position={cameraPosition} 
              fov={cameraFOV}
              lookAt={[0, 0, 0]}
            />
            
            {/* Enhanced Lighting for Luxury Board */}
            <ambientLight intensity={0.7} />
            
            {/* Main directional light */}
            <directionalLight 
              position={[0, 12, 8]} 
              intensity={2.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-12}
              shadow-camera-right={12}
              shadow-camera-top={20}
              shadow-camera-bottom={-5}
            />
            
            {/* Top-down light for board surface (accounting for rotation) */}
            <directionalLight 
              position={[0, 15, 2]} 
              intensity={1.8}
              color="#ffffff"
            />
            
            {/* Secondary top light for even coverage */}
            <directionalLight 
              position={[0, 10, 6]} 
              intensity={1.2}
              color="#ffffff"
            />
            
            {/* Key light for beveled edges */}
            <pointLight position={[0, 12, 4]} intensity={0.8} color="#ffffff" />
            
            {/* Accent lights for Chess Red borders */}
            <pointLight position={[-8, 8, 8]} intensity={0.6} color="#EC4957" />
            <pointLight position={[8, 8, 8]} intensity={0.6} color="#EC4957" />
            
            {/* Fill light for Chess Blue squares */}
            <pointLight position={[0, 8, 12]} intensity={0.4} color="#193A86" />
            
            {/* Front fill light for better visibility */}
            <pointLight position={[0, 6, 10]} intensity={0.5} color="#ffffff" />
            
            {/* Rim light for depth */}
            <pointLight position={[0, 4, -4]} intensity={0.3} color="#ffffff" />
            
            {/* Chessboard and pieces */}
            <ChessboardBase 
              position={boardPosition}
              rotation={boardRotation}
              scale={boardScale}
            />
            {/* Pawns and Queen pieces hidden - no pieces rendered */}
          </Canvas>
        </div>
      </motion.div>
    </>
  )
} 