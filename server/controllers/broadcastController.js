const Broadcast = require('../models/Broadcast');
const Recipient = require('../models/Recipient');

exports.createBroadcast = async (req, res) => {
  try {
    const { campaignName, message, recipients } = req.body;

    if (!campaignName || !message || !recipients || !Array.isArray(recipients)) {
      return res.status(400).json({ message: 'Campaign name, message, and recipients array are required' });
    }

    // Create broadcast campaign
    const broadcast = new Broadcast({
      campaignName,
      message
    });
    await broadcast.save();

    // Create recipients
    const recipientDocs = recipients.map(phone => ({
      phone,
      campaignId: broadcast._id,
      status: 'pending'
    }));
    await Recipient.insertMany(recipientDocs);

    res.status(201).json({
      message: 'Broadcast campaign created successfully',
      broadcast: {
        id: broadcast._id,
        campaignName: broadcast.campaignName,
        message: broadcast.message,
        createdAt: broadcast.createdAt,
        recipientCount: recipients.length
      }
    });
  } catch (error) {
    console.error('Create broadcast error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBroadcasts = async (req, res) => {
  try {
    const broadcasts = await Broadcast.find().sort({ createdAt: -1 });

    // Get delivery stats for each broadcast
    const broadcastsWithStats = await Promise.all(
      broadcasts.map(async (broadcast) => {
        const recipients = await Recipient.find({ campaignId: broadcast._id });
        
        const stats = {
          total: recipients.length,
          pending: recipients.filter(r => r.status === 'pending').length,
          sent: recipients.filter(r => r.status === 'sent').length,
          delivered: recipients.filter(r => r.status === 'delivered').length,
          failed: recipients.filter(r => r.status === 'failed').length
        };

        return {
          id: broadcast._id,
          campaignName: broadcast.campaignName,
          message: broadcast.message,
          createdAt: broadcast.createdAt,
          deliveryStats: stats
        };
      })
    );

    res.json({
      broadcasts: broadcastsWithStats
    });
  } catch (error) {
    console.error('Get broadcasts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
