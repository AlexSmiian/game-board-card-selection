import Container from "./components/_ui/Container";
import Logo from "./components/Logo";
import H1 from "./components/_ui/H1/indext.tsx";
import CashCounter from "./components/CashCounter";
import CardWrapper from "./components/CardWrapper";
import Inventory from "./components/Inventory";
import CashAnimationLayer from "./components/CashAnimationLayer";
import BombEffect from "./components/BombEffect";
import X2Effect from "./components/X2Effect";
import StopEffect from "./components/StopEffect";
import BombFieldEffect from "./components/BombFieldEffect";
import StopModal from "./components/StopModal";
import BombModal from "./components/BombModal";
import BombSaveModal from "./components/BombSaveModal";
import ClaimButton from "./components/ClaimButton";
import ClaimModal from "./components/ClaimModal";
import Navigation from "./components/Navigation";
import { useSpecialEffectsStore, useGameStore } from "./store/gameStore";
import { useState } from "react";

function App() {
    const { bombEffect, x2Effect, stopEffect, bombFieldEffect } = useSpecialEffectsStore();
    const { 
        showStopModal, 
        showBombModal, 
        showBombSaveModal,
        defuseCost,
        saveCost,
        takeHit,
        defuseBomb,
        saveResources,
        loseResources,
        claimRewards,
        counter,
        hideStopModalAction
    } = useGameStore();

    const [showClaimModal, setShowClaimModal] = useState(false);

    const handleOpenClaimModal = () => {
        setShowClaimModal(true);
    };

    const handleCloseClaimModal = () => {
        setShowClaimModal(false);
    };

    const handleClaimRewards = () => {
        claimRewards();
        setShowClaimModal(false);
    };

    const handleStopModalClaim = () => {
        hideStopModalAction();
        handleOpenClaimModal();
    };
    
    return (
        <>
            <Container>
                <Logo/>
                <H1/>
                <CashCounter />
                <CardWrapper />
                <Inventory />
                <ClaimButton 
                    disabled={counter === 0}
                    onOpenModal={handleOpenClaimModal}
                />
                <CashAnimationLayer />
                <BombEffect isActive={bombEffect} onComplete={() => {}} />
                <X2Effect isActive={x2Effect} onComplete={() => {}} />
                <StopEffect isActive={stopEffect} onComplete={() => {}} />
                <BombFieldEffect isActive={bombFieldEffect} onComplete={() => {}} />
                
                <StopModal 
                    isOpen={showStopModal}
                    onClaim={handleStopModalClaim}
                />
                
                <BombModal 
                    isOpen={showBombModal}
                    onTakeHit={takeHit}
                    onDefuse={defuseBomb}
                    defuseCost={defuseCost}
                />

                <BombSaveModal 
                    isOpen={showBombSaveModal}
                    onSaveResources={saveResources}
                    onLoseResources={loseResources}
                    saveCost={saveCost}
                />

                <ClaimModal
                    isOpen={showClaimModal}
                    onClose={handleCloseClaimModal}
                    onClaim={handleClaimRewards}
                />
            </Container>
            <Navigation />
        </>
    )
}

export default App
