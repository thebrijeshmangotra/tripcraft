
      {modalContent && (
        <Modal title={modalContent.title} onClose={() => setModalContent(null)}>
          <p className="text-muted-foreground">{modalContent.body}</p>
        </Modal>
      )}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => console.log("Auth successful")}
      />