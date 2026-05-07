import React from "react";
import { usePlane } from "@react-three/cannon";
import { Text, Float, RoundedBox, Html } from "@react-three/drei";

export const World = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      <Sky />
      <Floor />
      
      {/* Skill Zones */}
      <Marker position={[-20, 0, -20]} label="Python" color="#00f2ff" />
      <Marker position={[20, 0, -20]} label="Django" color="#ff00f2" />
      <Marker position={[-20, 0, 20]} label="React" color="#00f2ff" />
      <Marker position={[20, 0, 20]} label="MySQL" color="#ff00f2" />

      {/* Project Zones */}
      <ProjectZone 
        position={[0, 0, -40]} 
        label="Clinic Management" 
        sub="Django + MySQL" 
        color="#00f2ff" 
      />
      <ProjectZone 
        position={[40, 0, 0]} 
        label="City 360 App" 
        sub="Flutter + Mobile" 
        color="#ff00f2" 
      />

      {/* Experience Path */}
      <ExperiencePath />
      
      {/* Contact Hub */}
      <ContactHub position={[0, 0, 40]} />
    </>
  );
};

const Floor = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#050505" />
      <gridHelper args={[1000, 100, "#222", "#111"]} rotation={[Math.PI / 2, 0, 0]} />
    </mesh>
  );
};

const Sky = () => {
  return (
    <mesh scale={1000}>
      <sphereGeometry />
      <meshStandardMaterial color="#050505" side={2} />
    </mesh>
  );
};

const Marker = ({ position, label, color }) => (
  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
    <RoundedBox args={[4, 4, 0.5]} radius={0.5} smoothness={4}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      <Text position={[0, 0, 0.3]} fontSize={0.6} color="white">
        {label}
      </Text>
    </RoundedBox>
    <pointLight color={color} intensity={1} distance={10} />
  </Float>
);

const ProjectZone = ({ position, label, sub, color }) => (
  <group position={position}>
    <mesh receiveShadow position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[8, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.1} />
    </mesh>
    <Float position={[0, 4, 0]}>
      <Text fontSize={2} color={color} anchorY="bottom">
        {label}
      </Text>
      <Text position={[0, -1, 0]} fontSize={0.8} color="white" opacity={0.5}>
        {sub}
      </Text>
    </Float>
  </group>
);

const ContactHub = ({ position }) => (
  <group position={position}>
    <Text position={[0, 8, 0]} fontSize={3} color="#ff00f2">
      CONTACT HUB
    </Text>
    <group position={[0, 2, 0]}>
       <ContactButton 
        position={[-5, 0, 0]} 
        label="WhatsApp" 
        color="#25D366" 
        onClick={() => window.open("https://wa.me/918943281303", "_blank")} 
       />
       <ContactButton 
        position={[0, 0, 0]} 
        label="Email" 
        color="#EA4335" 
        onClick={() => window.location.href = "mailto:akakshayanil1112@gmail.com"} 
       />
       <ContactButton 
        position={[5, 0, 0]} 
        label="Call" 
        color="#4285F4" 
        onClick={() => window.location.href = "tel:+918943281303"} 
       />
    </group>
  </group>
);

const ContactButton = ({ position, label, color, onClick }) => (
  <Float position={position}>
    <RoundedBox args={[3, 1.5, 0.5]} radius={0.2} onClick={onClick} onPointerOver={() => (document.body.style.cursor = 'pointer')} onPointerOut={() => (document.body.style.cursor = 'auto')}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      <Text position={[0, 0, 0.3]} fontSize={0.4} color="white">
        {label}
      </Text>
    </RoundedBox>
  </Float>
);

const ExperiencePath = () => {
  return (
    <group>
      {/* Visual path line */}
      <mesh position={[-40, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
         <planeGeometry args={[2, 100]} />
         <meshStandardMaterial color="#333" transparent opacity={0.3} />
      </mesh>
      
      <Marker position={[-40, 0, -20]} label="BCA Graduate" color="#00f2ff" />
      <Marker position={[-40, 0, 0]} label="Faith InfoTech" color="#ff00f2" />
      <Marker position={[-40, 0, 20]} label="McDonald's Manager" color="#00f2ff" />
    </group>
  );
};
